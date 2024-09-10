import type { DefaultTheme } from "vitepress"

export const sidebar: DefaultTheme.Config["sidebar"] = {
  // 当用户位于 `guide` 目录时，会显示此侧边栏
  "/src/js/": [
    {
      text: "Javascript",
      collapsed: false,
      items: [
        { text: "History", link: "/src/js/" },
        {
          text: "Array",
          link: "/src/js/array.md",
        },
        {
          text: "for in of",
          link: "/src/js/forInOf.md",
        },
        { text: "Promsie", link: "/src/js/promise.md" },
        {
          text: "防抖&节流",
          link: "/src/js/deth.md",
        },
        {
          text: "Call",
          link: "/src/js/call.md",
        },
        {
          text: "Apply",
          link: "/src/js/apply.md",
        },
        {
          text: "Bind",
          link: "/src/js/bind.md",
        },
      ],
    },
    {
      text: "Typescript",
      collapsed: false,
      items: [{ text: "类型映射", link: "/src/ts/" }],
    },
  ],
  "/src/css/": [
    {
      text: "Css系列",
      collapsed: false,
      items: [
        { text: "css包含块", link: "/src/css/" },
        { text: "animation", link: "/src/css/animation.md" },
        { text: "position", link: "/src/css/position.md" },
        { text: "display", link: "/src/css/display.md" },
        { text: "scss", link: "/src/css/scss.md" },
        { text: "transition", link: "/src/css/transition.md" },
      ],
    },
  ],
  "/src/html/": [
    {
      text: "Html系列",
      collapsed: false,
      items: [
        { text: "a", link: "/src/html/" },
        { text: "meta", link: "/src/html/meta.md" },
        { text: "details", link: "/src/html/details.md" },
        { text: "dialog", link: "/src/html/dialog.md" },
        { text: "popover", link: "/src/html/popover.md" },
        { text: "history", link: "/src/html/history.md" },
        { text: "hase", link: "/src/html/hase.md" },
      ],
    },
  ],
  "/src/vue3/": [
    {
      text: "Vue3",
      collapsed: false,
      items: [{ text: "跑跑Demo", link: "/src/vue3/" }],
    },
  ],
  "/src/react/": [
    {
      text: "React",
      collapsed: false,
      items: [
        { text: "why?", link: "/src/react/" },
        { text: "v6", link: "/src/react/v6.md" },
        { text: "优化方式", link: "/src/react/batterway.md" },
      ],
    },
  ],
  "/src/hello/": [
    {
      text: "hello算法",
      collapsed: false,
      items: [{ text: "算法", link: "/src/helloAlgorithm/" }],
    },
  ],
}
