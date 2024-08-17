---
layout: doc
layoutClass: m-nav-layout
sidebar: false
pre: false
next: false
---

<style src="../../.vitepress/theme/style/nav.scss"></style>
<script setup>
import { NAV_DATA } from '../../.vitepress/theme/untils/data'
</script>

# 前端导航 <sub> [茂茂物语](https://fe-nav.netlify.app/) </sub>

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
