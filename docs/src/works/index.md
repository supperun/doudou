<style lang="scss" scoped>
.m-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  @media (min-width: $media) {
    .m-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
<script setup lang="ts">
import * as df from '../src/js/'
  const start = {
        icon: "/heart_fish.webp",
        title: "爱心鱼",
        badge: {
          text: "爱心鱼",
          type: "warning",
        },
        desc: "鱼妈妈喂食小鱼儿的爱心小游戏",
        link: "https://supperun.github.io/loveyu/",
        target: "_blank"
      }
  const escape = {
    icon: "/escape.ico",
    title: "逃离塔科夫",
    badge: {
      text: "硬核",
      type: "danger",
    },
    desc: "永无止息的交火正在慢慢把整个城市推向黑暗深渊。",
    link: "https://supperun/",
    target: "_blank"
  }
  const own = {
    icon: "/css3.webp",
    title: "make by css",
    badge: {
      text: "CSS3",
      type: "info",
    },
    desc: "CSS3生成蓝天白云",
    link: "./tiankong",
    target: null
  }
  const font = {
    icon: "/canvas.png",
    title: "make by Canvas",
    badge: {
      text: "canvas",
      type: "tip",
    },
    desc: "canvas实现文字雨效果",
    link: "./textRain",
    target: null
  }
</script>

# 练习集

## 起点

<div class="m-nav-links">
  <MNavLink v-bind="start" />
  <MNavLink v-bind="escape" />
</div>

## 原来还可以这样

<div class="m-nav-links">
 <MNavLink v-bind="own" />
 <MNavLink v-bind="font" />
</div>

## 爱心鱼时间线

::: timeline 2016-03-23

- 宿舍的凌晨

  - 初识 javascript
  - 通宵达旦，一个字母一个字母跟着视频敲
  - 鱼儿游起来了 😆😆😆

  :::

::: timeline 2018 ~ 2024

- 出入社会

  - 初识 typescript 停留
  - 一直想 Ts 重构，从未开始
  - 持续很久 💩💩💩

  :::

::: timeline 2024-08-01 ~ 2024-08-22

- 公寓的凌晨

  - 断断续续
  - webpack + ts + githup page ci/cd
  - 重构基本完成 😶😶😶

- 持续完善...

  :::
