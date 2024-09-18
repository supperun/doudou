# watcher

:::tip 观察者
`Watcher` 是 Vue.js 内部用于响应式系统的一个关键部分，它负责观察数据的变化并在数据变化时执行相应的回调函数。
:::

### new Watcher()做了什么？

1. 初始化属性：`Watcher` 构造函数初始化了各种属性，包括 `vm、expression、cb、id、deps、depIds、options` 等。
2. **_解析表达式或函数_**：如果 `expOrFn` 是一个函数，则直接赋值给` getter`；如果是一个字符串，则调用 `parsePath`解析成一个函数。
3. **_立即执行回调_**：如果 `options.lazy 为 false`，则立即调用 `get` 方法，获取当前值并执行回调。
4. **_依赖管理_**：`Watcher` 会将自己添加到依赖管理器中，以便在依赖变化时能够通知到它。

#### 入参解析

```js
function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  // ...
  if ((this.vm = vm) && isRenderWatcher) {
    vm._watcher = this
  }
  //... options lazy
  this.cb = cb
  this.id = ++uid$1 // uid for batching
  this.active = true
  this.post = false
  this.dirty = this.lazy // for lazy watchers
  this.deps = []
  this.newDeps = []
  this.depIds = new _Set()
  this.newDepIds = new _Set()
  this.expression = expOrFn.toString()
  // parse expression for getter
  // get console.log(this.getter)
  this.value = this.lazy ? undefined : this.get()
}
```

- `vm`参数通常指的是 Vue 实例，Watcher 观察的上下文对象
- `expOrFn`要观察的表达式或函数
- `cb`当观察的值变化时要执行的回调函数
- `options`可选的配置对象
  ```js
  if (options) {
    this.deep = !!options.deep // 深度监听
    this.user = !!options.user // 用户自定义的 Watcher
    // 如果设置为 true，则 Watcher 会延迟执行
    // 直到真正需要时才计算值。通常用于计算属性。
    this.lazy = !!options.lazy
    // 如果设置为 true，则 Watcher 会同步执行回调函数
    // 而不是等到下一个 DOM 更新周期。
    this.sync = !!options.sync
    // 一个函数，在 Watcher 更新之前调用。通常用于在更新之前执行一些操作
    this.before = options.before
  } else {
    this.deep = this.user = this.lazy = this.sync = false
  }
  ```
- `isRenderWatcher`标识是否是渲染 `Watcher。`

  - `renderWatcher`

  ```js
  function mountComponent() {
    // ...
    updateComponent = function () {
      vm._update(vm._render(), hydrating)
    }
    var watcherOptions = {
      before: function () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook$1(vm, "beforeUpdate")
        }
      },
    }
  }
  new Watcher(
    vm,
    updateComponent,
    noop,
    watcherOptions,
    true /* isRenderWatcher */
  )
  ```

  - `computedWatcher`

  ```js
  if (opts.computed) initComputed$1(vm, opts.computed)
  defineComputed(vm, key, userDef)
  var getter = isFunction(userDef) ? userDef : { get: Function }
  var watchers = (vm._computedWatchers = Object.create(null))
  watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)
  ```

  - `userWatcher` watch: {} this.$watch()

  ```js
  function initWatch(vm, watch) {
    for (var key in watch) {
      var handler = watch[key]
      if (isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i])
        }
      } else {
        createWatcher(vm, key, handler)
      }
    }
  }
  function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
      options = handler
      handler = handler.handler
    }
    if (typeof handler === "string") {
      handler = vm[handler]
    }
    // $watch 来自于 stateMixin()
    // 执行在new Vue之前，往Vue.prototype添加$watch方法
    return vm.$watch(expOrFn, handler, options)
  }
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    var watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      var info = 'callback for immediate watcher "'.concat(
        watcher.expression,
        '"'
      )
      pushTarget()
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
      popTarget()
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
  ```

#### 解析表达式或函数

```js
this.expression = expOrFn.toString()
// parse expression for getter
if (isFunction(expOrFn)) {
  this.getter = expOrFn
} else {
  this.getter = parsePath(expOrFn)
  if (!this.getter) {
    this.getter = noop
    warn$2(
      'Failed watching path: "'.concat(expOrFn, '" ') +
        "Watcher only accepts simple dot-delimited paths. " +
        "For full control, use a function instead.",
      vm
    )
  }
}

// unicodeRegExp.source 是一个包含 Unicode 字符的正则表达式模式
// [^....$_\\d] 表示匹配除 .、$、_ 和数字以外的任何字符
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"))
function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split(".") // 将路径字符串按 . 分割成数组 segments。
  // 返回一个函数，该函数接受一个对象 obj 作为参数，
  // 并根据 segments 数组中的路径逐级提取对象中的值。
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

// demo
var obj = {
  a: {
    b: {
      c: 42,
    },
  },
}
var path = "a.b.c"
var getter = parsePath(path)
console.log(getter(obj))
```

#### 执行回调 getter

```js
/**
 * Evaluate the getter, and re-collect dependencies.
 */
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Watcher.prototype.get = function () {
  pushTarget(this) // 指定当前的Watcher到Dep.target,等待dep收集
  var value
  var vm = this.vm
  try {
    // getter 是函数，函数体里触发相关字段的
    // get操作，将watcher收集到dep的deps
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'))
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
  }
  return value
}
```

#### 依赖收集

```js
// 依赖收集
Dep.target = null
var targetStack = []
function pushTarget(target) {
  targetStack.push(targ)
  Dep.target = target
}
function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

defineReactive() {
  // ...
  get: function reactiveGetter(){
    //... Dep.target 即 wather
    Dep.target && dep.depend()
  }
}
Dep.prototype.depend = function () {
  Dep.target && Dep.target.addDep(this)
}

// Add a dependency to this directive.
Watcher.prototype.addDep = function (dep) {
  // ... this 即 Dep.target 即 当前wather
  dep.addSub(this)
}
```
