# Promise

js 执行在一个单线程上，耗时操作必须交给其它处理，通过任务队列、事件循环，把带有结果信息的回调函数交由 js 线程处理。js 异步的机制就是回调函数，但是异步函数执行之间有依赖关系时，容易出现回调地狱的代码编写问题。prosmise 处理异步编程，同步化编写。

```js
function myPromsie() {
  return new Promise((resolve, reject) => {
    setTime(() => {
      let num = Math.random() * 10;
      num <= 5 ? resolve('num小于或等于5') : resject('num大于5');
    });
  });
}
function oPromise() {
  return new Promise((resolve, reject) => {
    console.log('oPromise call?');
    resolve('Yes!');
  });
}
myPromsie()
  .then(
    (data) => {
      console.log(data);
    },
    (data) => {
      console.log(data);
    }
  )
  .then(oPromise)
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally');
  });
```
