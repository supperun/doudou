export interface NavLink {
  /* 站点图标 */
  icon?: string | { svg: string }
  /* */
  badge?:
    | string
    | { text?: string; type?: "info" | "tip" | "warning" | "danger" }
  /* 站点名称 */
  title: string
  /* 站点描述 */
  desc?: string
  /* 站点链接 */
  link?: string
  /* 跳转行为 */
  target?: "_self" | "_preview" | "_blank" | "_top"
}

export interface NavData {
  title: string
  items: NavLink[]
}
