# details

## 黄金搭档 **\<summary>**

`details`元素通常和`summary`元素同时使用，缺省时浏览器会自动补充`summary`

```html
<details>
  <summary>这是摘要1</summary>
  <p>这里具体描述，标签相对随意，例如这里使用的&lt;p&gt;标签。</p>
</details>

<details open>
  <summary>这是摘要2</summary>
  <content
    >这里&lt;details&gt;标签设置了HTML布尔属性open，因此，默认是展开状态。</content
  >
</details>

<details open>
  <p>如果&lt;summary&gt;缺省，则会自动补上。</p>
</details>

<details open>
  <summary hidden></summary>
  <p>如果&lt;summary&gt;缺省，则会自动补上。</p>
</details>
```

页面效果：
<img src="/details.png" alt="details Image" style="width:100%;">
<img src="/summary-shadow.png" alt="summary Image" style="width:100%;">

**open** 属性决定内容的显示隐藏。
浏览器创建的`summary`元素是写在**Shadow DOM**，外部的 CSS 无法修改其样式。

## 样式自定义

> **::marker**伪元素 **font-size: 0** 消除默认的三角样式

页面效果：

<img src="/summary.png" alt="details Image" style="width:100%;">

```html
<h4>1. 小三角颜色变化</h4>
<details open>
  <summary class="summary1">这是摘要</summary>
  <p>这里具体描述，标签相对随意。</p>
</details>

<h4>2. 小三角位置变化</h4>
<details open>
  <summary class="summary2">这是摘要</summary>
  <p>这里具体描述，标签相对随意。</p>
</details>

<h4>3. 小三角字符替换</h4>
<details open>
  <summary class="summary3">这是摘要</summary>
  <p>这里具体描述，标签相对随意。</p>
</details>

<h4>4. 小三角完全自定义</h4>
<details open>
  <summary class="summary4">这是摘要</summary>
  <p>这里具体描述，标签相对随意。</p>
</details>
```

```css
.summary1::marker {
  color: red;
}
.summary2 {
  width: fit-content;
  direction: rtl;
}

.summary3::marker {
  content: '👉';
}
[open] > .summary3::marker {
  content: '👇';
}

.summary4::marker {
  font-size: 0;
}
.summary4::after {
  content: '';
  position: absolute;
  width: 1em;
  height: 1em;
  margin: 0.2em 0 0 0.5ch;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cpath d='M472.064 272.448L72.832 671.68c-22.08 22.08-22.08 57.792 0 79.872 22.016 22.016 57.792 22.08 79.872 0L512 392.256l359.296 359.296c22.016 22.016 57.792 22.08 79.872 0s22.016-57.792 0-79.872L551.936 272.448c-22.08-22.016-57.792-22.016-79.872 0z' fill='%238a8a8a'/%3E%3C/svg%3E")
    no-repeat center / 12px 12px;
  transform: rotate(90deg);
  transition: transform 0.2s;
}
[open] > .summary4::after {
  transform: rotate(180deg);
}
```

## 手风琴效果

> **chrome、safari 中多个 details 元素设置了相同的 name 属性值，则这些 details 元素间会形成互斥关系**

```html
<details name="accordion">
  <summary class="summary2">HTML</summary>
  <p>这里具体描述，标签相对随意。</p>
</details>
<details name="accordion">
  <summary class="summary3">CSS</summary>
  <p>这里具体描述，标签相对随意。</p>
</details>
```
