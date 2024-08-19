<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useData } from "vitepress"

// 获取CanvasDom
const textRain = ref()
const str = '012345爱6789ABC兜DEF我GHIJKL爱M你NOPQ兜RSTUVWXYZ'
// 文字大小
const fontSize = 16
let charIndex: number[] = [] // 用于跟踪每一列的字符索引
let columnCount: number // 根据画布宽度计算列数
let timer = ref()

let { isDark } = useData()

// 初始化操作
function init() {
  if (typeof window !== 'undefined') {
    // 设置canvas为浏览器可视区域的宽高
    textRain.value.width = window?.innerWidth
    textRain.value.height = window?.innerHeight
  }
  // 记录宽度上可以画的字符数，用于计算x坐标：i*fontSize
  columnCount = Math.floor(textRain.value.width / fontSize)
}

// 节流函数 延迟时间馁只执行一次  闭包特性：flag变量在内部函数执行外依然存在
function throttleFn(func: Function, delay: number) {
  let flag = false
  return function () {
    if (!flag) {
      func.apply(this, arguments)
      flag = true
      let t = setTimeout(() => {
        flag = false
        clearTimeout(t)
      }, delay)
    }
  }
}

// 随机去取所需画的字符
function getRandomChar() {
  return str[Math.floor(Math.random() * str.length)]
}

function draw() {
  // 获取2d画笔
  const ctx = textRain.value?.getContext('2d')
  if (ctx) {
    // 画方块，覆盖文字，实现文字消失效果
    ctx.fillStyle = isDark.value ? "rgba(55, 65, 81, 0.05)" : "rgba(229, 231, 235, 0.05)"
    ctx.fillRect(0, 0, textRain.value.width, textRain.value.height)
    ctx.fillStyle = '#4FC08D'
    // 文字样式
    ctx.font = `px self`
  }
  for (let index = 0; index < columnCount; index++) {
    // 获取一个随机字符
    const x = index * fontSize // 计算字符的 x 坐标
    const y = charIndex[index] * fontSize // 计算字符的 y 坐标
    ctx?.fillText(getRandomChar(), x, y) // 画字符

    // 判断字符消失，重置下标为0不显示出，否则++继续向下画
    if (y > textRain.value.height || Math.random() > 0.95) {
      charIndex[index] = 0
    } else {
      charIndex[index]++
    }
  }
}

onMounted(() => {
  init()
  charIndex = new Array(columnCount).fill(0)
  draw()
  timer.value = setInterval(() => {
    draw()
  }, 30)

  const throtterInit = throttleFn(init, 1000)
  if (typeof window !== 'undefined') {
    window.onresize = () => {
      throtterInit()
    }
  }
})
onUnmounted(() => {
  clearInterval(timer.value)
})

</script>
<template>
  <canvas ref="textRain" class="text-rain"></canvas>
</template>
<style scoped lang="scss">
.text-rain {
  position: fixed;
  inset: 0;
  z-index: 1;
}
</style>