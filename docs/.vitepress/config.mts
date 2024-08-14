import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/doudou/',
  title: '兜兜~',
  description: 'from zero to one',
  // 设置标签页标题
  head: [
    ['link', { rel: 'icon', href: '/doudou/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
  ],
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },
  themeConfig: {
    logo: '/favicon.ico',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '三驾马车',
        items: [
          { text: 'Js', link: '/src/js/index.md' },
          { text: 'Css', link: '/src/css/index.md' },
          { text: 'Html', link: '/src/html/index.md' },
        ],
      },
      {
        text: '后台',
        items: [{ text: 'Node', link: '/src/node/index.md' }],
      },
    ],
    sidebar: [
      {
        text: 'Javascript系列',
        items: [
          { text: 'History', link: '/src/js/index.md' },
          {
            text: 'Array',
            link: '/src/js/array.md',
          },
          {
            text: 'for in of',
            link: '/src/js/forInOf.md',
          },
          { text: 'Promsie', link: '/src/js/promise.md' },
          {
            text: '防抖&节流',
            link: '/src/js/deth.md',
          },
        ],
      },
      {
        text: 'Css系列',
        items: [{ text: 'css包含块', link: '/src/css/index.md' }],
      },
      {
        text: 'Html系列',
        items: [
          { text: 'a', link: '/src/html/index.md' },
          { text: 'meta', link: '/src/html/meta.md' },
          { text: 'details', link: '/src/html/details.md' },
          { text: 'dialog', link: '/src/html/dialog.md' },
          { text: 'popover', link: '/src/html/popover.md' },
        ],
      },
      {
        text: 'Vue3',
        items: [{ text: '跑跑Demo', link: '/src/vue3/index.md' }],
      },
      {
        text: 'Typescript系列',
        items: [{ text: '类型映射', link: '/src/ts/index.md' }],
      },
      {
        text: 'hello算法',
        items: [{ text: '算法', link: '/src/helloAlgorithm/index.md' }],
      },
    ],
    //开启本地搜索
    search: {
      provider: 'local',
    },
    //修改侧边栏导航的标题
    outline: {
      label: '页面导航',
    },
    // 修改文档页脚的文字
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    editLink: {
      pattern: 'https://github.com/supperun/doudou/blob/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/supperun/doudou' },
    ],
  },
})
