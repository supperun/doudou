<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #aside-outline-before>
            <!-- sidebar top content -->
        </template>
        <template #aside-outline-after>
            <!-- sidebar bottom content -->
        </template>
    </Layout>
</template>