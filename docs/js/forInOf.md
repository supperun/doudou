# for in for of

## for in

> for...in 循环用于遍历对象的可枚举属性

```js
for (variable in object) {
  // 在此处编写对对象属性进行操作的代码
}
```

在 `for...in` 循环中，variable 代表一个变量，用于在每次迭代中存储对象的属性名，而 object 是要遍历的对象。在每次迭代中，variable 会依次被赋值为对象的每个可枚举属性的属性名，然后可以通过 object[variable]来获取属性的值。

需要注意的是，`for...in` 循环遍历的是对象的可枚举属性，可能会包括从原型链上继承来的属性。因此，在使用 `for...in` 循环时，一般需要通过 **hasOwnProperty** 方法来检查属性是否为对象自身的属性，以避免意外遍历到继承的属性。

```js
for (var variable in object) {
  if (object.hasOwnProperty(variable)) {
    // 在此处编写对对象自身属性进行操作的代码
  }
}
```

值得一提的是，除非特别需要遍历对象的属性，一般情况下更推荐使用`for...of`循环用于遍历**数组**或其他**可迭代对象**，以及使用 `Object.keys`、`Object.values` 或 `Object.entries` 等方法用于遍历对象自身的属性。

## for of

> for...of 循环是一种用于遍历可迭代对象（如**数组、字符串、Map、Set** 等）中的元素的循环结构

```js
for (variable of iterable) {
  // 在此处编写针对可迭代对象中元素的操作代码
}
```

在 `for...of` 循环中，variable 代表一个变量，用于在每次迭代中存储可迭代对象中的一个元素值，而 **iterable** 是要遍历的可迭代对象。在每次迭代中，variable 会依次被赋值为可迭代对象中的每个元素值。

`for...of` 循环可以遍历**数组、字符串、Map、Set** 等实现了**迭代协议**（Iterable protocol）的对象。在遍历数组时，variable 会被依次赋值为数组中的每个元素；在遍历字符串时，variable 会被依次赋值为字符串中的每个字符；在遍历 Map 时，variable 会被依次赋值为每个键值对的值；在遍历 Set 时，variable 会被依次赋值为每个集合中的值。

使用 `for...of` 循环可以简洁地遍历可迭代对象中的元素，而且不需要手动管理索引，因此它在处理数组等数据结构时比传统的 for 循环更加方便和易读。

## 可迭代对象

```js
let obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]: function* () {
    yield [this.a, this.b];
  },
};
Object.prototype.func = function () {
  return [this.a, this.b];
};
console.log(obj.func());

let a;
let b;
for (const element of obj) {
  [a, b] = element;
}
console.log(a, b);
```

```js
let arr = [
  { id: 1, name: '12' },
  { id: 1, name: '13' },
  { id: 2, name: '12' },
];

function af(arr, cb) {
  let aMap = new Map();
  for (let item of arr) {
    if (!aMap.has(cb(item))) {
      aMap.set(cb(item), item);
    }
  }
  // 取出Map中的values,输出成数组
  // Array.from(aMap.values);
  // [...aMap.values()];
  return [...aMap.values()];
}
console.log(af(arr, (a) => a.name));
```
