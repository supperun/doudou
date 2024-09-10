# Call

::: tip **ECMA**

```js
1.If argumentsList is not present, set argumentsList to a new empty List.
2.If IsCallable(F) is false, throw a TypeError exception.
3.Return ? F.[[Call]](V, argumentsList).
```

:::

## 实现

```js
Function.prototype.call = function (boundThis, args) {
  if (typeof this !== "function") {
    throw new Error("type error")
  }
  // 1. 如果 boundThis 是 null 或 undefined，
  // this 设置为全局对象（浏览器中是 window，Node.js 中是 global）
  const boundThis === null || boundThis === undefined
   ? globalThis : Object(boundThis)
  // 2. 创建一个唯一的临时属性名，避免与原对象上的属性冲突
  const fnKey = Symbol("fnKey")
  // 3. 将 this 函数作为 boundThis 的一个属性
  boundThis[fnKey] = this
  // 4. 使用普通函数调用的方式执行目标函数，并传递参数
  // 保证 this(目标函数中的this) 指向 boundThis
  const result = boundThis[fn](...args)
  // 5. 删除临时添加的属性
  delete context[fn]
  return result
}
```

## 使用

```js
function sum(a, b, c) {
  return a + b + c
}

const boundThis = { value: "some context" } // 可以是任意对象
const boundArgs = [1, 2] // 绑定前两个参数

// 拼接绑定的参数和新的参数列表
const args = boundArgs.concat([3]) // [1, 2, 3]

// 调用自定义的 call 函数
const result = sum.call(boundThis, ...args)
console.log(result) // 输出 6
```

## 将方法转换为实用函数

::: tip
`call()` 几乎等同于普通函数调用，只是将 this 作为普通参数传入，而不是作为函数所在的对象值。这类似于通用的实用函数的工作方式：你可以使用 `map(array, callback)` 来代替 `array.map(callback)`，这样可以避免对 `Array.prototype` 进行修改，还可以将 `map` 用于不是数组的类数组对象（例如 `arguments`）。
:::

以 `Array.prototype.slice()` 为例，你想要将类数组对象转换为真正的数组。你可以创建一个类似这样的快捷方式：

```js
const slice = Array.prototype.slice
slice.call(arguments)

const mapFromArray = Array.prototype.map
const map = Function.prototype.call.bind(mapFromArray)
map([1, 2, 3], (value) => console.log(value))
```

::: warning
请注意，你不能将 `slice.call` 保存并将其作为普通函数调用，因为 `call()` 方法也会读取它的 `this` 值，而这个值应该是它要调用的函数。在这种情况下，你可以使用 `bind()` 来绑定 `call()` 的 `this` 值。
:::

在下面的代码片段中，`slice()` 是一个绑定了 `this` 值为 `Array.prototype.slice()` 的 `Function.prototype.call()` 的版本。这意味着额外的 `call()` 调用可以被省略：

```js
const unboundSlice = Array.prototype.slice
const slice = Function.prototype.call.bind(unboundSlice)

slice(arguments)
```

## call 开火车

```js
const fn = (a, b) => console.log(a, b)
fn.call.call.call(fn, 1, 2, 3) // fn.cell(1,2,3) fn(2,3)
// 结果是5，而1是作为call的thisArg，与null等同，替换为globalThis
```

::: tip
`fn.call.call.call(fn, 1, 2, 3)` === `Function.prototype.call.call.call(fn, 1, 2, 3)`
<br/>
`fn.__proto__ === Function.prototype`
<br/>
<br/>
`Function.prototype.call.call(fn, 1, 2, 3)` === `fn.call(1, 2, 3)`
<br/>
`Function.prototype`.`call`.`call(fn, 1, 2, 3)` 给.`call`.指定调用者为`fn`,参数`1, 2, 3`
<br/>
`fn`.`call(1,2,3)`

`call`、`apply`、`bind` 都干了两件事，给要调用的函数指定 `thisArg`,同时给定参数`args`。
`Object.prototype.toString.call(thisArg, args)` => `thisArg.toString(args)`
:::
