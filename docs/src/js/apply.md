# apply

::: tip **ECMA**

```js
1. Let func be the this value.
2. If IsCallable(func) is false, throw a TypeError exception.
3. If argArray is either undefined or null, then
 a. Perform PrepareForTailCall().
 b. Return ? Call(func, thisArg).
4. Let argList be ? CreateListFromArrayLike(argArray).
5. Perform PrepareForTailCall().
6. Return ? Call(func, thisArg, argList).
```

:::

## 实现

```js
Function.prototype.apply = function (boundThis, argsArray) {
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
  let result
  if(args) {
    // 4. 使用普通函数调用的方式执行目标函数，并传递参数
    // 保证 this(目标函数中的this) 指向 boundThis
    result = boundThis[fn](...argsArray)
  } else {
    result = boundThis[fn]()
  }
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
const result = sum.apply(boundThis, args)
console.log(result) // 输出 6
```
