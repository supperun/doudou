import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  // 当用户位于 `guide` 目录时，会显示此侧边栏
  '/src/js/': [
    {
      text: 'Javascript',
      collapsed: false,
      items: [
        { text: 'History', link: '/src/js/' },
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
      text: 'Typescript',
      collapsed: false,
      items: [{ text: '类型映射', link: '/src/ts/' }],
    },
  ],
  '/src/css/': [
    {
      text: 'Css系列',
      collapsed: false,
      items: [{ text: 'css包含块', link: '/src/css/' }],
    },
  ],
  '/src/html/': [
    {
      text: 'Html系列',
      collapsed: false,
      items: [
        { text: 'a', link: '/src/html/' },
        { text: 'meta', link: '/src/html/meta.md' },
        { text: 'details', link: '/src/html/details.md' },
        { text: 'dialog', link: '/src/html/dialog.md' },
        { text: 'popover', link: '/src/html/popover.md' },
      ],
    },
  ],
  '/src/vue3/': [
    {
      text: 'Vue3',
      collapsed: false,
      items: [{ text: '跑跑Demo', link: '/src/vue3/' }],
    },
  ],
  '/src/hello/': [
    {
      text: 'hello算法',
      collapsed: false,
      items: [{ text: '算法', link: '/src/helloAlgorithm/' }],
    },
  ],
}
