# popover 属性

> 较 dialog，**popover（HTML 全局属性，任何元素都可以使用）** 敏捷交互更加适合，尤其是在移动端--屏幕尺寸和点击阴影关闭。

## 基本使用

给需要弹出的元素`popover`属性，通过给触发弹出的按钮设置`popovertarget="imgPopover"`，值为需要弹出的元素的 id。

```html
<button class="button" popovertarget="imgPopover">点击我</button>
<div popover id="imgPopover">
  <img src="/assets/example.jpg" />
</div>
```

1. 默认居中
2. 顶层元素
3. 默认背景透明可穿透，可单独设置

```css
dialog::backdrop {
  background: rgba(0, 0, 0, 0.1);
}
```

## 属性和方法

`popover='auto`默认
`popover='manual'`需手动执行 api

1. HTMLElement.hidePopover()
2. HTMLElement.showPopover()
3. HTMLElement.togglePopover()

`:popover-open`伪类匹配弹层元素
