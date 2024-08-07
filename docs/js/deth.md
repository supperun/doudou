# 防抖与节流

```js
/**
 * 防抖：必须delay秒后执行一次
 * delay秒里触发，则更新定时器
 *
 * 输入框
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function debouncedFn(func, delay) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
```

```js
/**
 * 节流：delay秒里只能执行一次
 * 变量flag初始为false,func函数执行一次后，
 * 在delay秒里，flag都为true,阻止func执行，
 * 直到delay之后，flag变成true,才可执行func
 *
 * 按钮持续点击
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function throttleFn(func, delay) {
  let flag = false;
  return function () {
    if (!flag) {
      func.apply(this, arguments);
      flag = true;
      let t = setTimeout(() => {
        flag = false;
        clearTimeout(t);
      }, delay);
    }
  };
}
let fnt = throttleFn(() => {}, 3000);
fnt();
setTimeout(fnt, 2000);
setTimeout(fnt, 4000);
```
