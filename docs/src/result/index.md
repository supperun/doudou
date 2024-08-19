# 有用易忘

> 收录各种有用的但是很容易忘掉的小代码

## 滚动距离

::: tip 滚动距离

置顶是需要计算出滚动距离，存在单位换算 -- vh-> px

:::

```js
window.scrollTo({ top: (90 * window.innerHeight) / 100, behavior: "smooth" })
```

## 平滑透明度和形变

::: tip 平滑透明度和形变

根据计算出的滚动距离，平滑的计算出 opacity 与 transform 变化，界面显示平滑变更

:::

```js
window.onscroll = (e: Event) => {
  const scrollY = window.scrollY

  // 计算透明度和缩放值
  const opacity = Math.max(1 - scrollY / 500, 0)
  const scale = Math.max(1 - scrollY / 1000, 0.5)
  btn.value.opacity = opacity
  btn.value.transform = `scale(${scale})`
}
```

## 随机数

::: tip 随机数
生成指定范围内的随机数

用于返回小于或等于给定数字的最大整数，通常用于*向下取整*
:::

```js
console.log(Math.floor(4.7)) // 输出: 4
console.log(Math.floor(4.3)) // 输出: 4
console.log(Math.floor(-4.7)) // 输出: -5
console.log(Math.floor(0.9)) // 输出: 0

function rn(to: number, from: number) {
  return ~~(Math.random() * (to - from + 1)) + from
}

// 随机取出给定字符串的一个字符
const str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function getRandomChar() {
  return str[Math.floor(Math.random() * str.length)]
}

// 生成 1 到 10 之间的随机整数

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
console.log(getRandomInt(1, 10)) // 输出一个1到10之间的随机整数
```
