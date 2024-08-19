<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useData } from "vitepress"

// 获取CanvasDom
const textRain = ref()
const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// 文字大小
const fontSize = 16
let charIndex: number[] = [] // 用于跟踪每一列的字符索引 // 根据画布宽度计算列数
let columnCount: number
let timer = ref()

let { isDark } = useData()

function init() {
  if (typeof window !== 'undefined') {
    textRain.value.width = window?.innerWidth
    textRain.value.height = window?.innerHeight
  }
  columnCount = Math.floor(textRain.value.width / fontSize)
}

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

function getRandomChar() {
  return str[Math.floor(Math.random() * str.length)]
}

function draw() {
  // 获取2d画笔
  const ctx = textRain.value?.getContext('2d')
  if (ctx) {
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
    ctx?.fillText(getRandomChar(), x, y)

    if (y > textRain.value.height || Math.random() > 0.95) {
      charIndex[index] = 0
    } else {
      charIndex[index]++
    }
  }
}

onMounted(() => {
  init()
  for (let index = 0; index < columnCount; index++) {
    charIndex[columnCount] = 1
  }
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