// shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const defineComponent: DefineComponent
  export default defineComponent
}
