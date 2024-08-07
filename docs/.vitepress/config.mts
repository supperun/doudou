import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/doudou/',
  title: '兜兜~',
  description: 'from zero to one',
  themeConfig: {
    logo: '/favicon.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Js', link: 'js/index.md' },
      { text: 'Css', link: 'css/index.md' },
    ],
    sidebar: [
      {
        text: 'Javascript系列',
        items: [
          { text: 'History', link: '/js/index.md' },
          {
            text: 'Array',
            link: '/js/array.md',
          },
          {
            text: '防抖&节流',
            link: '/js/deth.md',
          },
        ],
      },
      {
        text: 'Css系列',
        items: [{ text: 'css', link: '/css/index.md' }],
      },
      {
        text: 'Html系列',
        items: [{ text: 'a标签', link: '/html/index.md' }],
      },
      {
        text: 'hello算法',
        items: [{ text: '算法', link: '/helloAlgorithm/index.md' }],
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
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/supperun/doudou' },
    ],
  },
});
