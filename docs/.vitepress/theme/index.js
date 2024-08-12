import DefaultTheme from 'vitepress/theme';
import custom from '../layout/custom.vue';
import HomeLess from '../component/homeLess.vue';

export default {
  extends: DefaultTheme,
  Layout: custom,
  // 使用注入插槽的包装组件覆盖 Layout
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('home-less', HomeLess);
  },
};
