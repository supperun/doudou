<script setup lang="ts">
import TextRain from "./TextRain.vue"
import TainAfter from "./TainAfter.vue"
import { nextTick, onMounted, ref } from "vue"

// 打工人语录
const WORK = 'https://apis.tianapi.com/dgryl/index?key=5f44c5cd2e76564eb75c47859b3b124a'

const btn = ref({
  opacity: 1,
  transform: ''
})

let result = ref({ content: '' })

async function fetchData(url: string) {
  try {
    const response = await (await fetch(url)).json()
    if (response.code === 200) {
      result.value.content = response.result.content
      console.log(result.value.content)
    } else {
      throw new Error('网络请求不正常！')
    }

  } catch (error) {
    console.log(error)
  }
}

function homeAfterTOTop() {
  window.scrollTo({ top: 90 * window.innerHeight / 100, behavior: "smooth" })
}

window.onscroll = (e: Event) => {

  const scrollY = window.scrollY

  // 计算透明度和缩放值
  const opacity = Math.max(1 - scrollY / 500, 0)
  const scale = Math.max(1 - scrollY / 1000, 0.5)
  btn.value.opacity = opacity
  btn.value.transform = `scale(${scale})`
}
onMounted(() => {
  fetchData(WORK)
})

</script>

<template>
  <div class="text-tain-home">
    <TextRain></TextRain>
    <div class="wang-say pl-custom-padding">
      <h1>晚上好</h1>

      <p class="city-text mg6">我爱你，兜兜 🍭🍬🍧</p>

      <p class="other-text mg6">现在的温度比较舒适~ </p>

      <p class="other-text mg6">今天 【暴雨】 25°C - 30°C</p>

      <p v-if="result?.content" class="other-text mg6">{{ result?.content }}</p>

      <p class="other-text mg6">加油！再坚持一下，最近的三个节日是 9月10日的教师节、9月18日的中秋节、10月1日的国庆节</p>

    </div>
    <div class="hidden-div">
      <div class="start-look">
        <div class="more-btn" :style="{ opacity: btn.opacity, transform: btn.transform }" @click="homeAfterTOTop()">开始浏览
        </div>
      </div>
    </div>
    <TainAfter></TainAfter>
  </div>
</template>

<style lang="scss" scope>
.text-tain-home {
  .mg6 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .wang-say {
    position: fixed;
    top: 5rem;
    left: 1.5rem;
    z-index: 2;

    h1 {
      letter-spacing: -.02em;
      line-height: 40px;
      font-size: 32px;
    }

    .city-text {
      font-weight: 500;
      font-size: 2.2em;
    }

    .other-text {
      font-size: 1.6em;
      font-weight: 400;
      line-height: 1.8;
    }
  }

  .hidden-div {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 90vh;

    .start-look {
      position: absolute;
      bottom: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      .more-btn {
        padding: .5rem 1rem;
        border: 1px solid;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        /* 添加过渡效果 */
      }
    }
  }

  @media (min-width: 1440px) {
    .pl-custom-padding {
      padding-left: calc((100vw - 1020px) / 2);
      padding-right: calc((100vw - 1020px) / 2);
    }
  }
}
</style>