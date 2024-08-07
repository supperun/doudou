# Array

> 双端队列（deque），存储有序的集合。

## <small>内部</small>

数组是一种特殊的对象。使用方括号来访问属性 `arr[0]` 实际上是来自于对象的语法。它其实与 `obj[key]` 相同，其中 `arr` 是对象，而数字用作键`key`。
它们扩展了对象，提供了特殊的方法来处理有序的数据集合以及 length 属性。但从本质上讲，它仍然是一个对象。
记住，数组是一个对象，因此其行为也像一个对象。

例如，它是通过引用来复制的。

```js
let arr = ['abc', '123', '哈哈'];
arr.toString(); // 'abc,123,哈哈'
arr.push(function () {
  return this;
});
// 类似于obj[method]() this指向arr
arr[arr.length](); //  ['abc', '123', '哈哈', func...]
```

## <small>类数组</small>

在浏览器和其它环境中有一种称为“类数组”的对象，它们 看似是数组。也就是说，它们有 length 和索引属性，但是也可能有其它的非数字的属性和方法。

**JavaScript 中常见的类数组包括：**

1. Arguments 对象：函数内部自动包含的类数组对象，包含传递给函数的参数列表。
2. NodeList 对象：DOM 操作返回的节点集合，如 document.getElementsByTagName、document.querySelectorAll。
3. HTMLCollection 对象：DOM 操作返回的元素集合，如 document.getElementsByClassName、element.children。

这些类数组对象在某些方面类似于数组，但不具备数组的所有方法和特性。因此，有时需要将它们转换为真正的数组才能使用数组的方法

**使用 Array.from() 方法：**

```js
let arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
let array = Array.from(arrayLike);
```

**使用 Array.prototype.slice.call() 方法：**

```js
let nodeList = document.querySelectorAll('div');
let array = Array.prototype.slice.call(nodeList);
```

**使用扩展运算符（spread operator）：**

```js
let arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
let array = [...arrayLike];
```

## <small>稀疏数组</small>

```js
let sparseArray = [1, , 3, , 5];
```

1. 内存占用：稀疏数组可能会占用更多的内存空间，因为它们会为每个缺失的元素保留一个空间。这可能导致内存浪费和影响性能。
2. 遍历行为：在使用 forEach()、map() 等数组方法时，稀疏数组的空缺位置可能会导致意外的行为，因为这些方法会跳过空缺的位置，导致部分元素未被处理。
3. JSON 序列化：将稀疏数组转换为 JSON 字符串时，空缺位置可能会被忽略，导致序列化结果与期望不符。

## <small>最大子数组</small>

输入是以数字组成的数组，例如 arr = [1, -2, 3, 4, -9, 6].
写出函数 getMaxSubSum(arr)，用其找出并返回最大和。

```js
function getMaxSubSum(arra) {
  let partmax = 0;
  let ar = arra.reduce((pre, curr) => {
    partmax += curr;
    partmax < 0 ? (partmax = 0) : partmax;
    return Math.max(pre, partmax);
  }, 0);
  return ar;
}
```
