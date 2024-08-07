import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/doudou/',
  title: '兜兜~',
  description: 'from zero to one',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Js', link: 'js/index.md' },
      { text: 'Css', link: 'css/index.md' },
    ],
    sidebar: [
      {
        text: 'Javascript系列',
        items: [
          { text: 'History', link: 'js/index.md' },
          {
            text: 'Array',
            link: 'js/array.md',
          },
          {
            text: '防抖&节流',
            link: 'js/deth.md',
          },
        ],
      },
      {
        text: 'Css系列',
        items: [{ text: 'css', link: 'css/index.md' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
