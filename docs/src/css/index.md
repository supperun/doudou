# CSS 包含块

## 什么是包含块

包含块是一个用于确定元素的定位和尺寸的上下文。它是一个元素的边界，影响其子元素的布局和样式。

## 包含块的类型

1. **块级元素**：如 `<div>`、`<p>` 等，通常会创建新的包含块。
2. **定位元素**：使用 `position` 属性（如 `relative`、`absolute`、`fixed`）的元素也会创建包含块。
3. **浮动元素**：使用 `float` 属性的元素会影响包含块的计算。

## 如何创建包含块

- **默认情况下**，每个块级元素都会创建一个包含块。
- **绝对定位**的元素会相对于最近的定位祖先元素创建包含块。

## 示例

```css
.container {
    position: relative; / 创建包含块 /
}
.child {
    position: absolute; / 相对于 .container 定位 /
    top: 10px;
    left: 20px;
}

```

## 注意事项

- 包含块的计算会受到 CSS 属性的影响，如 `overflow`、`display` 等。
- 理解包含块对于布局和响应式设计至关重要。

## 参考资料

- [MDN Web Docs - CSS Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning)
- [CSS Tricks - Understanding CSS Positioning](https://css-tricks.com/understanding-css-positioning/)
