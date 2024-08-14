import DefaultTheme from 'vitepress/theme';
import layout from '../layout/Layout.vue';
import HomeLess from '../component/homeLess.vue';
import HomeMore from '../component/homeMore.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  // 自定义布局
  Layout: layout,
  // 使用注入插槽的包装组件覆盖 Layout
  enhanceApp({ app }) {
    console.log(app.component);
    // 注册自定义全局组件
    app.component('home-less', HomeLess);
    app.component('home-more', HomeMore);
  },
};
