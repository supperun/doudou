import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import 'vitepress-markdown-timeline/dist/theme/index.css'
import { inBrowser, useRoute, useData } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import layout from './component/Layout.vue'
import HomeUnderline from './component/HomeUnderline.vue'
import DataPanel from './component/DataPanel.vue'
import confetti from './component/confetti.vue'
import mediumZoom from 'medium-zoom'
// import { useLive2d } from 'vitepress-theme-website'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { onMounted, watch, nextTick } from 'vue'

export default {
  // ...DefaultTheme,
  extends: DefaultTheme,
  Layout: layout,
  setup() {
    const route = useRoute()
    const { frontmatter } = useData()

    const initZoom = () => {
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }) // 默认
      mediumZoom('img', {
        margin: 20,
        scrollOffset: 100,
        background: 'var(--vp-c-bg)',
      })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )

    // <script src="https://giscus.app/client.js"
    //         data-repo="supperun/doudou"
    //         data-repo-id="R_kgDOMgSN2w"
    //         data-category="Announcements"
    //         data-category-id="DIC_kwDOMgSN284ChuBe"
    //         data-mapping="pathname"
    //         data-strict="0"
    //         data-reactions-enabled="1"
    //         data-emit-metadata="0"
    //         data-input-position="bottom"
    //         data-theme="preferred_color_scheme"
    //         data-lang="zh-CN"
    //         data-loading="lazy"
    //         crossorigin="anonymous"
    //         async>
    // </script>

    // giscus配置
    giscusTalk(
      {
        repo: 'supperun/doudou', //仓库
        repoId: 'R_kgDOMgSN2w', //仓库ID
        category: 'Announcements', // 讨论分类
        categoryId: 'DIC_kwDOMgSN284ChuB', //讨论分类ID
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
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
  },
  // 使用注入插槽的包装组件覆盖 Layout
  enhanceApp({ app, router }) {
    // 注册自定义全局组件
    app.component('home-under-line', HomeUnderline)
    app.component('data-panel', DataPanel)
    app.component('confetti', confetti)
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
}
