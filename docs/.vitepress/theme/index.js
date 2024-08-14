import DefaultTheme from 'vitepress/theme';
import customLayout from '../layout/customLayout.vue';
import HomeLess from '../component/homeLess.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  // 自定义布局
  Layout: customLayout,
  // 使用注入插槽的包装组件覆盖 Layout
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('home-less', HomeLess);
  },
};
