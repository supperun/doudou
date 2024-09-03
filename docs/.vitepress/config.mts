import { defineConfig } from "vitepress"
import { nav, sidebar } from "./configs"
import timeline from "vitepress-markdown-timeline"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/doudou/",
  title: "supperun",
  description: "from zero to one",
  // 设置标签页标题
  head: [
    ["link", { rel: "icon", href: "/doudou/favicon.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
  ],
  markdown: {
    //行号显示
    lineNumbers: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
    config: (md) => {
      md.use(timeline as any)
    },
  },
  // 自定义字体规则
  transformHead({ assets }) {
    // 相应地调整正则表达式以匹配字体
    const customFont = assets.find((file) => /inter-Thin\.\w+\.tff/)
    if (customFont) {
      return [
        [
          "link",
          {
            rel: "preload",
            href: customFont,
            as: "font",
            type: "font/tff",
            crossorigin: "",
          },
        ],
      ]
    }
  },
  themeConfig: {
    logo: "/dff.jpg",
    nav,
    sidebar,
    //开启本地搜索
    search: {
      provider: "local",
    },
    //修改侧边栏导航的标题
    outline: {
      label: "页面导航",
    },
    // 修改文档页脚的文字
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
    editLink: {
      pattern: "https://github.com/supperun/doudou/blob/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    socialLinks: [
      { icon: "github", link: "https://github.com/supperun/doudou" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "鄂ICP备2024071235号 | 运行晚餐",
    },
  },
})
