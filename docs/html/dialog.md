# dialog

> div 模拟的弹框无法替代 dialog

## form 元素与对话框自动关闭

**无需 js 参与**

1. `form` 元素上设置 `method="dialog"`，提交表单后，不在默认刷新页面或打开新窗口
2. `button`元素上设置 formmethod="dialog"

```html
<dialog class="dialog">
  <img src="./vitepress-logo-large.webp" />
  <form method="dialog">
    <button formmethod="dialog">我知道</button>
  </form>
</dialog>
<script>
  let dialog = document.querySelector('dialog');
  dialog.open = true;
</script>
```

## 关闭判断来源

1. 在取消按钮上添加`value=cancel`
2. js 出发弹框关闭，通过`dialog.close('submit');`传参

```html
<button onclick="dialog.show();">点击显示弹框</button>
<p><output id="output">&nbsp;</output></p>
<dialog id="dialog">
  <form id="form">
    <p><input placeholder="请输入姓名" required /></p>
  </form>
  <form>
    <button form="form">确定</button>
    <button formmethod="dialog" value="cancel">取消</button>
  </form>
</dialog>
<script>
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    dialog.close('submit');
  });
  dialog.addEventListener('close', () => {
    output.textContent = 'returnValue: ' + dialog.returnValue;
  });
</script>
```

## 自动聚焦

实用原生的的 html 元素做组件，天然支持键盘无障碍访问。浏览器自动聚焦到弹框内。

```html
<script>
  // 无法触发聚焦
  dialog.open = true;
  dialog.toggleAttribute('open', true);

  // 必须使用下面方法之一
  dialog.show();
  dialog.showModal();
</script>
```

## `showModal`真正的模态对话框

```html
<button class="button" onclick="dialog.showModal();">点击显示对话框</button>
<dialog id="dialog">
  <form id="form">
    <p><input placeholder="请输入姓名" required /></p>
  </form>
  <form>
    <button class="button" form="form">确定</button>
    <button class="button normal" formmethod="dialog" value="cancel">
      取消
    </button>
  </form>
</dialog>
```

1. 水平垂直居中
2. **黑色半透明遮罩层，底部元素不可交互**
3. 固定定位，不再是绝对定位
4. :modal 伪类
5. **整个网页只有模态框可以聚焦，js 也无法操作改变焦点**
6. **`top-layer` 层级自动最高,顶层特性，其他页面元素 `z-index` 无穷大也不能遮盖模态框**

```css
dialog {
  z-index: 1;
  width: 360px;
  max-width: calc(100% - 2rem);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #0003;
}
/* 模态框样式 */
dialog:modal {
  overlay: auto !important;
}
dialog:-internal-dialog-in-top-layer {
  position: fixed;
  inset-block-start: 0px;
  inset-block-end: 0px;
  max-width: calc(100% - 2em - 6px);
  max-height: calc(100% - 2em - 6px);
  user-select: text;
  visibility: visible;
  overflow: auto;
}
dialog[open] {
  display: block;
}
dialog:-internal-dialog-in-top-layer::backdrop {
  position: fixed;
  inset: 0px;
  background: rgba(0, 0, 0, 0.1);
}
```

<img src="/showModal.png" alt="details Image" style="width:100%;">

<img src="/top-layer.png" alt="details Image" style="width:100%;">
