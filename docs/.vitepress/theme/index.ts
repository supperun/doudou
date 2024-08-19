import DefaultTheme from "vitepress/theme"
import "./style/index.css"
import "vitepress-markdown-timeline/dist/theme/index.css"
import { inBrowser, useRoute, useData } from "vitepress"
import busuanzi from "busuanzi.pure.js"
import layout from "./component/Layout.vue"
import HomeUnderline from "./component/HomeUnderline.vue"
import DataPanel from "./component/DataPanel.vue"
import confetti from "./component/confetti.vue"
import MNavLink from "./component/MNavLink.vue"
import MNavLinks from "./component/MNavLinks.vue"
import mediumZoom from "medium-zoom"
import giscusTalk from "vitepress-plugin-comment-with-giscus"
import { onMounted, watch, nextTick, h } from "vue"

export default {
  // ...DefaultTheme,
  extends: DefaultTheme,
  Layout() {
    const props: Record<string, string> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }
    return h(layout, props)
  },
  setup() {
    const route = useRoute()
    const { frontmatter } = useData()

    const initZoom = () => {
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }) // 默认
      mediumZoom("img-zoom", {
        margin: 20,
        scrollOffset: 100,
        background: "var(--vp-c-bg)",
      })
    }
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )

    async function asyncLoadOml2d() {
      const { loadOml2d } = await import("oh-my-live2d")
      // 看板娘
      loadOml2d({
        dockedPosition: "right",
        models: [
          {
            path: "https://model.oml2d.com/cat-black/model.json",
            scale: 0.15,
            position: [0, 20],
            stageStyle: {
              height: 350,
            },
          },
          {
            path: "https://model.oml2d.com/HK416-1-normal/model.json",
            position: [0, 60],
            scale: 0.08,
            stageStyle: {
              height: 450,
            },
          },
          {
            path: "https://model.oml2d.com/shizuku_pajama/index.json",
            scale: 0.2,
            volume: 0,
            position: [40, 10],
            stageStyle: {
              height: 350,
              width: 330,
            },
          },
        ],
      })
    }

    // giscus配置
    giscusTalk(
      {
        repo: "supperun/doudou", //仓库
        repoId: "R_kgDOMgSN2w", //仓库ID
        category: "Announcements", // 讨论分类
        categoryId: "DIC_kwDOMgSN284ChuBe", //讨论分类ID
        mapping: "pathname",
        inputPosition: "bottom",
        lang: "zh-CN",
        crossorigin: "anonymous",
      },
      {
        frontmatter,
        route,
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    )

    onMounted(() => {
      initZoom()
      asyncLoadOml2d()
    })
  },
  // 使用注入插槽的包装组件覆盖 Layout
  enhanceApp({ app, router }) {
    // 注册自定义全局组件
    app.component("home-under-line", HomeUnderline)
    app.component("data-panel", DataPanel)
    app.component("confetti", confetti)
    app.component("MNavLink", MNavLink)
    app.component("MNavLinks", MNavLinks)
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
}
