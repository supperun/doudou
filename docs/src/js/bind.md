# bind

::: tip **ECMA**

```js
1. Let Target be the this value.
2. If IsCallable(Target) is false, throw a TypeError exception.
3. Let F be ? BoundFunctionCreate(Target, thisArg, args).
4. Let L be 0.
5. Let targetHasLength be ? HasOwnProperty(Target, "length").
6. If targetHasLength is true, then
  a. Let targetLen be ? Get(Target, "length").
  b. If targetLen is a Number, then
    i. If targetLen is +∞𝔽, then
      1. Set L to +∞.
    ii. Else if targetLen is -∞𝔽, then
      1. Set L to 0.
    iii. Else,
      1. Let targetLenAsInt be ! ToIntegerOrInfinity(targetLen).
      2. Assert: targetLenAsInt is finite.
      3. Let argCount be the number of elements in args.
      4. Set L to max(targetLenAsInt - argCount, 0).
7. Perform SetFunctionLength(F, L).
8. Let targetName be ? Get(Target, "name").
9. If targetName is not a String, set targetName to the empty String.
10. Perform SetFunctionName(F, targetName, "bound").
11. Return F.
```

:::

## 实现

```js
function myBind(fn, thisArg, ...boundArgs) {
  // 1. Let Target be the this value.
  const Target = fn

  // 2. If IsCallable(Target) is false, throw a TypeError exception.
  if (typeof Target !== "function") {
    throw new TypeError("Target must be callable")
  }

  // 3. Let F be BoundFunctionCreate(Target, thisArg, args).
  function boundFunction(...args) {
    return Target.apply(this instanceof boundFunction ? this : thisArg, [
      ...boundArgs,
      ...args,
    ])
  }

  // 4. Let L be 0. (initialize L)
  let L = 0

  // 5. Let targetHasLength be HasOwnProperty(Target, "length").
  if (Object.prototype.hasOwnProperty.call(Target, "length")) {
    // 6. If targetHasLength is true:
    const targetLen = Target.length

    if (typeof targetLen === "number") {
      if (targetLen === Infinity) {
        L = Infinity // i. If targetLen is +∞, then set L to +∞.
      } else if (targetLen === -Infinity) {
        L = 0 // ii. Else if targetLen is -∞, set L to 0.
      } else {
        const targetLenAsInt = Math.floor(targetLen) // Convert length to integer
        const argCount = boundArgs.length
        L = Math.max(targetLenAsInt - argCount, 0) // Set L to max(targetLenAsInt - argCount, 0).
      }
    }
  }

  // 7. SetFunctionLength(F, L). (set the length property of bound function)
  Object.defineProperty(boundFunction, "length", {
    value: L,
    writable: false,
  })

  // 8. Let targetName be Get(Target, "name").
  let targetName = Target.name

  // 9. If targetName is not a String, set targetName to the empty String.
  if (typeof targetName !== "string") {
    targetName = ""
  }

  // 10. Perform SetFunctionName(F, targetName, "bound").
  Object.defineProperty(boundFunction, "name", {
    value: `bound${targetName}`,
    writable: false,
  })

  // 11. Return F.
  return boundFunction
}
```

## 解释

`myBind` 函数接收三个参数：

1.  `fn` 是要绑定的函数。

    - `thisArg` 是绑定的 `this` 值。
    - `...boundArgs` 是提前绑定的参数。
    - 校验目标是否为函数：
      如果 `fn` 不是一个函数，会抛出 `TypeError`。

2.  `boundFunction` 是通过 `BoundFunctionCreate` 创建的：
    使用 `apply` 来调用原始函数 `fn`，结合绑定参数和调用时传入的新参数。

3.  `length` 属性的计算：
    通过检查目标函数的 length 属性，并根据绑定的参数数量调整新函数的 length 属性。

4.  `name` 属性设置：
    将目标函数的名称添加上 "bound" 前缀，表示这是一个绑定的函数。

## 为什么要计算 max(targetLenAsInt - argCount, 0)

::: tip
max(targetLenAsInt - argCount, 0) 的计算用于确定新绑定函数的 length 属性值，
这是在实现 bind 函数时确保新函数的参数个数与原函数一致的关键部分。
:::

### 原因解析：

1. 目标函数的 `length` 属性：

   - 函数的 `length` 属性表示函数定义时所期望的参数个数（即形参的数量），而不是实际传入的参数。
   - 例如，函数 `function foo(a, b, c) {}` 的 `length` 为 3，因为它定义了 3 个参数。

2. 绑定的参数 `(boundArgs)`：

   - 使用 `bind` 绑定函数时，可以预先传入一些参数。这些参数会在每次调用绑定函数时自动提供，而不需要在调用时再传入。
   - 例如，如果你调用 `foo.bind(null, 1)`，那么每次调用这个新绑定的函数时，参数 `a` 会自动设置为 1。

3. 计算剩余参数：

   - 新的绑定函数仍然可能接受未绑定的参数。
   - 例如，在 `foo.bind(null, 1)` 中，函数 `foo` 需要 3 个参数，但已经绑定了一个，所以还需要 2 个参数才能完全调用它。
     `targetLenAsInt - argCount` 的计算就是为了确定绑定后函数还需要多少参数（即还未绑定的参数数量）。

4. `max` 用于确保结果非负：

   - 如果绑定的参数数量多于函数定义的参数数量（例如，`foo.bind(null, 1, 2, 3)，foo` 只定义了 3 个参数，但 `bind` 绑定了 3 个），那么剩余参数的需求就为 0。
   - `Math.max(targetLenAsInt - argCount, 0)` 确保 `length` 属性不会为负数，因为负数在这种情况下没有意义。

## 原 bind 使用

```js
function list(...args) {
  return args
}

function addArguments(arg1, arg2) {
  return arg1 + arg2
}

console.log(list(1, 2, 3)) // [1, 2, 3]

console.log(addArguments(1, 2)) // 3

// 创建一个带有预设前导参数的函数
const leadingThirtySevenList = list.bind(null, 37)

// 创建一个带有预设第一个参数的函数。
const addThirtySeven = addArguments.bind(null, 37)

console.log(leadingThirtySevenList()) // [37]
console.log(leadingThirtySevenList(1, 2, 3)) // [37, 1, 2, 3]
console.log(addThirtySeven(5)) // 42
console.log(addThirtySeven(5, 10)) // 42
//（最后一个参数 10 被忽略）
```

```js
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function () {
  return `${this.x},${this.y}`
}

const p = new Point(1, 2)
p.toString()
// '1,2'

// thisArg 的值并不重要，因为它被忽略了
const YAxisPoint = Point.bind(null, 0 /*x*/)

const axisPoint = new YAxisPoint(5)
axisPoint.toString() // '0,5'

axisPoint instanceof Point // true
axisPoint instanceof YAxisPoint // true
new YAxisPoint(17, 42) instanceof Point // true
```
