# 七彩天空

> 到是觉得可以尝试做背景

<script setup>
  import TianKong from "./component/TianKong.vue"

</script>

## 火烧云

`css ('#11cbd7', '#c6f1e7', '#f0fff3', '#fa4659) `
<TianKong :colors="['#11cbd7', '#c6f1e7', '#f0fff3', '#fa4659']"/>

## 白云苍狗

`css ('#11cbd7', '#c6f1e7', '#f0fff3', '#96C9F4') `

<TianKong :colors="['#11cbd7', '#c6f1e7', '#f0fff3', '#96C9F4']"/>

::: details 代码实现

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue"

const cloud = ref()
const props = defineProps<{ colors: string[] }>()

// 生成随机数
function rn(to: number, from: number) {
  return ~~(Math.random() * (to - from + 1)) + from
}

function rs(...args: string[]) {
  return args[rn(1, args.length) - 1]
}

// box-shadow生成一个阴影数组，大小和位置都是随机生成的。
function boxShadows(max: number) {
  let ret: string[] = []
  for (let i = 0; i < max; ++i) {
    ret.push(`
      ${rn(1, 100)}vw ${rn(1, 100)}vh ${rn(20, 40)}vmin ${rn(1, 20)}vmin
      ${rs(...props.colors)}
    `)
  }
  return ret.join(",")
}

function update() {
  cloud.value.style.boxShadow = boxShadows(30)
}

onMounted(() => {
  update()
})
</script>
<template>
  <div class="tiankong">
    <div ref="cloud" id="cloud"></div>
    <div class="bg" style="height: 50vh;" @click="update()"></div>
    <svg width="100">
      <filter id="filter">
        <!-- 生成随机噪音 -->
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".01"
          numOctaves="10"
        ></feTurbulence>
        <!-- 位移映射 -->
        <feDisplacementMap in="SourceGraphic" scale="240"></feDisplacementMap>
      </filter>
    </svg>
  </div>
</template>
<style lang="scss" scope>
.tiankong {
  --cp-color-blue-light-hsl: 196.2deg 100% 73.14%;
  --cp-color-blue-light: hsl(var(--cp-color-blue-light-hsl));
  position: relative;
  height: 50vh;
  overflow: hidden;
  background-color: var(--cp-color-blue-light);

  &::after {
    content: "点击更新";
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 1;
    width: 100%;
    bottom: 1rem;
    text-align: center;
  }
}

#cloud {
  overflow: hidden;
  width: 1px;
  height: 1px;
  transform: translate(-100%, -100%); // 移动到页面外
  border-radius: 50%;
  filter: url(#filter); // filter滤镜，来生成最终的样式
}
</style>
```

:::
