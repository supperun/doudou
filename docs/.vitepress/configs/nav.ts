/* configs/nav.ts */
import type { DefaultTheme } from "vitepress"

export const nav: DefaultTheme.Config["nav"] = [
  { text: "首页", link: "/" },
  { text: "练习集", link: "/src/works/" },
  { text: "前端导航", link: "/src/nav/" },
  {
    text: "三驾马车",
    items: [
      { text: "Js", link: "/src/js/" },
      { text: "Css", link: "/src/css/" },
      { text: "Html", link: "/src/html/" },
    ],
  },
  {
    text: "框架",
    items: [
      { text: "Vue3", link: "/src/vue3/" },
      { text: "React", link: "/src/react/" },
      { text: "Angular", link: "/src/vue3/" },
    ],
  },
  {
    text: "后台",
    items: [{ text: "Node", link: "/src/node/index.md" }],
  },
  { text: "示例", link: "/src/demo.md" },
  { text: "VitePress", link: "https://vitepress.yiov.top/" },
]
