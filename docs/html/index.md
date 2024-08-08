# 你不知道的<a>a</a>元素

```html
<a href="/" target="_blank">首页</a>
```

## `ref` 属性

1. `ref="nofollow"`

SEO 友好常用策略，告诉搜索引擎不要追踪这个链接。
目标页面显示无效信息，或者敏感信息。
目标页面属于外站，不希望共享权重。(大型网站，新闻网站)

2. `ref="noopner" && ref="opener"`

登录成功后主页自动刷新

```html
<a href="/login.html" target="_blank" ref="opener">登录</a>
```

```js
window.opener.location.reload();
```

**安全隐患**

被恶意篡改主页内容，或者被人通过 window.opener.document.cookie 获取用户敏感信息并进行身份伪造
常识性技术；target="blank"与 ref="noopener"搭配使用
现代浏览器已经默认 target="blank"时，ref="noopener"。

1. `ref="noreferrer"`

   documnent.referrer 可以返回页面当前的来源地址，设置了 ref="noreferrer",这个字段就为空字符串。百度统计，谷歌分析都是通过这个字段来判断页面访来自哪里。

   实用例子：

   1. 移动端开发，用户通过分享链接进入，返回时可以通过此字段，判断返回逻辑--为空返回主页，不为空返回上一页。
   2. 列表页，点击任意列表去到详情页，通过详情页的链接返回列表页的时候，页面依然定位在之前的滚动位置。其他页面进入列表页，则滚动到顶部。列表页通过不同的 referrer 判断页面来源做不同处理。

   外站链接最好都设置 noreferrer

   ```html
   <a href="/login.html" target="_blank" ref="noopener noreferrer">外部网站</a>
   ```

## `target`不为人知的特性

```html
<a href="/login.html" target="_preview">预览</a>
```

每次新开同一个窗口（自动刷新），这样就避免多次打开新标签页，所造成的不必要麻烦。

## 实用的`download`

```html
<a href="./example.jpg" download="namexxx.jpg">预览</a>
```

资源跨域了，无法触发下载。浏览器无法识别该资源，直接触发下载。比如 zip。（MIME Type 是 application/zip）。
设置 PDF 资源的 header 中的 Content-Type 是浏览器不认识的类型。
设置 Content-Disposition 为 attachment,Content-Type 保持一致即可。

## ping

可以发送 POST 请求，Content-Type 为 text/ping,支持跨域，数据上报准确（navigator.sendBeacon()）。只能在 a 元素，area 元素上使用。
具体是使用场景就是在统计显示观看次数。无需 javascript 参与

## href 细节

1. 自动绝对地址

```js
new URL('./xxx.html', 'https://www.xxx.cn').href;

let eleLink = document.createElement('a');
eleLink.href = './xxx.html';
```

2. 锚点定位
   href="#example"配合 id="example"

   href="#top"时候，直接返回浏览器顶部，当然是在页面上没有 id="top"的时候。

   ```html
   <a href="#top">返回顶部</a>
   ```
