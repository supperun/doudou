---
layout: home

title: supperun
titleTemplate: 运行晚餐
head:
  - - meta
    - name: description
      content: 前端基础
  - - meta
    - name: keywords
      content: javascript css html hello算法
hero:
  name: '仓颉: hello,world!'
  text: 'up & up'
  tagline: From zero to one
  actions:
    - theme: brand
      text: Javascript
      link: js/index.md
    - theme: alt
      text: CSS
      link: css/index.md
    - theme: alt
      text: HTML
      link: html/index.md
    - theme: alt
      text: Hello算法
      link: helloAlgorithm/index.md
---

## 斐波那契数列

这段代码定义了一个递归的 fibonacci 函数来计算第 n 个斐波那契数。你可以替换 n 的值来计算不同位置的斐波那契数。

```js
function fibonacci(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
```
