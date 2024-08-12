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
  name: '文祖仓颉'
  text: '双瞳四目，天生睿德'
  tagline: 观察星宿的运动趋势、鸟兽的足迹，依照其形象创文字，革除当时结绳记事之陋，开创文明之基，因而被尊奉为“文祖仓颉”。
  image: '/cangjie.jpg'
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

<style scope>
  .text {
    
  }
</style>
