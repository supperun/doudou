import DefaultTheme from 'vitepress/theme';
import layout from '../layout/Layout.vue';
import HomeLess from '../component/homeLess.vue';
import HomeMore from '../component/homeMore.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout: layout,
  // 使用注入插槽的包装组件覆盖 Layout
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('home-less', HomeLess);
    app.component('home-more', HomeMore);
  },
};
