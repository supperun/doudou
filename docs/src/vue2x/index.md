# Before new Vue()

::: tip before Vue 大体流程
往 `Vue` 构造函数的原型上，挂载全局可以使用的方法。`$nextTick`，`$watch`，核心的`_render`，`_update`方法...
:::

```js
function Vue(options) {
  if (__DEV__ && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword")
  }
  this._init(options)
}

//@ts-expect-error Vue has function type
initMixin(Vue)
//@ts-expect-error Vue has function type
stateMixin(Vue)
//@ts-expect-error Vue has function type
eventsMixin(Vue)
//@ts-expect-error Vue has function type
lifecycleMixin(Vue)
//@ts-expect-error Vue has function type
renderMixin(Vue)
```

### initMixin(Vue)

```js
Vue.prototype._init = function (options?: Record<string, any>) {
    const vm: Component = this
    // merge options
    initInternalComponent(vm, options as any)
    if (options && options._isComponent) {
      initInternalComponent(vm, options as any)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor as any),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (__DEV__) {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate', undefined, false /* setContext */)
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

#### initLifecycle

```js
function initLifecycle(vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._provided = parent ? parent._provided : Object.create(null)
  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
```

#### initRender

```js
export function initRender(vm: Component) {
  // ...
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = parentVnode
    ? normalizeScopedSlots(
        vm.$parent!,
        parentVnode.data!.scopedSlots,
        vm.$slots
      )
    : emptyObject
  // @ts-expect-error
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
  /* istanbul ignore else */
 defineReactive(
    vm,
    '$attrs',
    (parentData && parentData.attrs) || emptyObject,
    null,
    true
  )
  defineReactive(
    vm,
    '$listeners',
    options._parentListeners || emptyObject,
    null,
    true
  )
}
```

#### initEvents

```js
export function initEvents(vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```

#### initInjections

```js
export function initInjections(vm: Component) {
  const result = resolveInject(vm.$options.inject, vm)
  defineReactive(vm, key, result[key])
}
```

#### initState

- initMethods
- initData
- initWatch
- initComputed
- initProps

#### initProvide

```js
export function resolveProvided(vm: Component): Record<string, any> {
  // by default an instance inherits its parent's provides object
  // but when it needs to provide values of its own, it creates its
  // own provides object using parent provides object as prototype.
  // this way in `inject` we can simply look up injections from direct
  // parent and let the prototype chain do the work.
  const existing = vm._provided
  const parentProvides = vm.$parent && vm.$parent._provided
  if (parentProvides === existing) {
    return (vm._provided = Object.create(parentProvides))
  } else {
    return existing
  }
}
export function initProvide(vm: Component) {
  const provideOption = vm.$options.provide
  if (provideOption) {
    const provided = isFunction(provideOption)
      ? provideOption.call(vm)
      : provideOption
    if (!isObject(provided)) {
      return
    }
    const source = resolveProvided(vm)
    // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
    // iterate the keys ourselves.
    const keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      Object.defineProperty(
        source,
        key,
        Object.getOwnPropertyDescriptor(provided, key)!
      )
    }
  }
}
```

### stateMixin

```js
export function stateMixin(Vue: typeof Component) {
  Object.defineProperty(Vue.prototype, "$data", dataDef)
  Object.defineProperty(Vue.prototype, "$props", propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function () {
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}
```

### eventsMixin

经典的事件中心
`vm._events`来源于`initMixin(Vue)`中`initEvents(vm)`挂载`_events`

```js
function eventsMixin(Vue: typeof Component) {
  vm._events[event]
  Vue.prototype.$on = ...
  Vue.prototype.$once = ...
  Vue.prototype.$off = ...
  Vue.prototype.$emit = ...
}
```

### lifecycleMixin

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  // ...
  Vue.prototype.$forceUpdate = function () {
    const vm: Component = this
    if (vm._watcher) {
      vm._watcher.update()
    }
  }
  Vue.prototype.$destroy = function () {
    const vm: Component = this
    callHook(vm, "beforeDestroy")
    callHook(vm, "destroyed")
    // turn off all instance listeners.
    vm.$off()
  }
}
```

### renderMixin

```js
export function renderMixin(Vue: typeof Component) {
  // ...
  Vue.prototype.$nextTick = function () {}
  Vue.prototype._render = function () {}
}
```

## 总结

`$mount`，`$data`， `$props`，`$watch`，`$on`，`$once`，`$emit`，`$forceUpdate`，`$destroy`，`$nextTick`，`_init`， `_render`，`_update`。--挂载在原型链，`$attrs`，`$listeners`--挂载在当前实例，均已提供。
