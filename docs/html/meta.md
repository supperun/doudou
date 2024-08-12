# Meta

在 HTML 中，<meta>元素可以用来设置网页的描述、关键字、作者、字符集等信息。常见的包括：

1. charset：指定网页的字符集。
2. http-equiv="refresh": 网页自动刷新功能。
3. name="description"：指定网页的描述。
4. name="keywords"：指定网页的关键字。
5. name="author"：指定网页的作者。
6. name="viewport"：控制移动端浏览器的视口尺寸和缩放行为。

这些可以通过属性 content 来设置其具体的内容或值。

## http-equiv

1. 2 秒钟后网页自动跳转

```html
<meta http-equiv="refresh" content="2;url='https://www.html.api.cn'"></meta>
```

2. Content Security Policy(csp) 安全设置可以指定页面中所有资源的加载与执行规则

```html
/* 禁止内联 js 代码块执行 */
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
```

```html
/* 禁止HTML元素上style样式渲染 */
<meta http-equiv="Content-Security-Policy" content="style-src-attr 'none'" />
```

```html
/*百度制定的元数据规则 pc，移动端权重共享 子域名*/
<meta
  http-equiv="mobile-agent"
  content="format=html5;url=https://mobie.htmlapi.cn"
/>
```

## SEO 重要元素之一

> 搜索引擎必须得三个 HTML 元素

```html
<title>SEO</title>
<meta name="description" content="你并不了解HTML" />
<meta name="keywords" content="css vue" />
```

> robots 策略定义

```html
<meta name="robots" content="noindex" />
<meta name="robots" content="none" />
<meta name="robots" content="noindex, nofollow" />
```

1. index: 允许抓取
2. follow: 允许页面跟踪
3. nofollow: 不允许抓取页面中的链接
4. none: 等同于 index follow

`<meta>`区别于`<a>`，设置影响的是整个页面

> Open Graph 协议 开放图谱协议

用于提取有效信息展示

```html
<meta property="og:title" content="文章标题" />
<meta property="og:type" content="article" />
<meta property="og:image" content="https://xxx.jpg" />
<meta property="og:url" content="https://xxx.some-url" />
...
```

> 网页尺寸

```html
<meta
  name="viewport"
  content="width=device-width;initial-scale=1.0;user-scalable=no; viewport-fit=cover"
/>
```

`viewport-fit=cover` 环境变量函数生效

安全区域是 iphone 底部触摸横条，和顶部刘海屏后出现的概念

```css
body {
  padding-bottom: env(safe-area-inset-bottom， 0.5vh);
}
```

移动端一连串数字会被默认当做手机号高亮显示，可以如下设置修改默认行为

```html
<meta name="foramt-detection" content="telephone=no" />
<meta name="foramt-detection" content="date=no" />
<meta name="foramt-detection" content="address=no" />
<meta name="foramt-detection" content="email=no" />
```

## 网站风格和主题色设置

```html
<meta name="theme-color" content="#0c58c0" />
/* 倾向于浅色 */
<meta name="theme-color" content="light dark" />
<meta name="theme-color" content="only light" />
<meta
  name="theme-color"
  media="(prefers-color-scheme: light)"
  content="skyblue"
/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="blcak" />
```
