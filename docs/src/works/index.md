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
  link: "https://supperun.cn/escape",
  target: "_blank"
}
const own = {
  icon: "/css3.webp",
  title: "make by Css",
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
const vue2x = {
  icon: "/vue.ico",
  title: "make by vue-analysis",
  badge: {
    text: "vue2x",
    type: "tip",
  },
  desc: "vue-analysis",
  link: "https://supperun.cn/vue-analysis/",
  target: '_blank'
}
const vue3 = {
  icon: "/vue.ico",
  title: "make by vue3",
  badge: {
    text: "vue3",
    type: "tip",
  },
  desc: "vue3 源码碎片",
  link: "/doudou/src/vue3/",
  target: null
}
const reactstart = {
  icon: "/react.svg",
  title: "make by me",
  badge: {
    text: "react",
    type: "tip",
  },
  desc: "react start",
  link: "https://supperun.cn/react",
  target: "_blank"
}
const react = {
  icon: "/react.svg",
  title: "make by react 18",
  badge: {
    text: "react",
    type: "tip",
  },
  desc: "react文档",
  link: "https://supperun.cn/",
  target: "_blank"
}
const angular = {
  icon: "/angular.ico",
  title: "make by angular",
  badge: {
    text: "angular",
    type: "tip",
  },
  desc: "angular文档",
  link: "https://angular.dev/",
  target: "_blank"
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

## resolve & reject

<div class="m-nav-links">
 <MNavLink v-bind="vue2x" />
 <MNavLink v-bind="vue3" />
 <MNavLink v-bind="reactstart" />
 <MNavLink v-bind="react" />
</div>

## pending

<div class="m-nav-links">
 <MNavLink v-bind="angular" />
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

  :::

::: timeline 2024-09-02

- 公寓的夜晚...

  - 部署到备案成功的服务器
  - 😆😆😆

  :::

::: timeline 2024-09-13

- 公寓的白昼...

  - 删除游戏分数，gameove 相关代码
  - 满屏尺寸，移动端屏幕旋转试完
  - 添加自动游动
  - 添加生命周期，自定义钩子代码失败
  - 😆😆😆

- 持续完善...

  :::
