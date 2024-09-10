# Nginx Static

在 Nginx 中，静态资源的配置是一个常见的应用场景，主要用于提供网站上的 HTML、CSS、JavaScript 文件、图片等静态文件。通过对静态资源进行优化配置，
可以提升页面加载速度、减少服务器压力。

### 1. **基础静态资源服务配置**

静态资源的最基础配置是设置文件的根目录 (root) 和默认的首页文件 (index)。

```nginx
server {
    listen 80;
    server_name example.com;

    # 静态文件的根目录
    root /var/www/html;

    # 默认首页文件
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

- **root**：定义 Nginx 查找静态文件的根目录。所有请求路径会在此目录下查找。
- **index**：定义当用户访问目录时返回的默认文件（如 `index.html` 或 `index.htm`）。
- **try_files**：指示 Nginx 按顺序尝试查找文件，若找不到文件则返回 404 错误。

### $uri

在 Nginx 中，`$uri` 是一个内置变量，表示请求的当前 URI 路径。
URI（Uniform Resource Identifier，统一资源标识符）通常指的是浏览器发出的请求中不包括查询字符串部分的路径部分。

### `$uri` 的特性

1. **自动解码**：Nginx 在处理请求时，会自动将 URI 中的百分比编码解码（如 `%20` 会解码为一个空格）。所以 `$uri` 中的内容是解码后的路径。
2. **与 `$request_uri` 的区别**：`$uri` 是 Nginx 处理的 URI，而 `$request_uri` 是客户端最初发送的原始请求 URI。两者的区别在于：
   - `$uri` 可能会在 Nginx 的处理过程中被修改（如重写规则）。
   - `$request_uri` 则保持原始状态，包含请求中的完整 URI，包括查询字符串部分。

### `$uri` 的常见用法

在 Nginx 配置中，`$uri` 变量通常与其他指令配合使用，用于实现 URL 重写、文件查找等功能。

#### 1. **`try_files` 指令**

`try_files` 指令用于按顺序尝试不同的文件或 URI 路径，直到找到第一个存在的文件或目录。常用于处理静态文件或前端路由。

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

解释：

- 先尝试请求的 `$uri` 是否存在文件。
- 如果不存在，则尝试 `$uri/` 是否为一个目录。
- 如果都不存在，则将请求交给 `/index.html`（通常用于前端单页面应用 SPA 进行路由）。

#### 2. **URL 重写**

`$uri` 在 Nginx 的 `rewrite` 指令中经常用于修改请求路径，比如把旧的 URL 重定向到新的 URL。

```nginx
rewrite ^/old-path/(.*)$ /new-path/$1 break;
```

在这种情况下，`$uri` 可能会被修改为 `/new-path/$1`，即新路径。

#### 3. **静态资源配置**

在配置静态资源时，Nginx 通过 `$uri` 变量查找用户请求的文件路径：

```nginx
location /images/ {
    root /var/www;
    try_files $uri $uri/ =404;
}
```

这里 Nginx 会尝试查找 `/var/www/images/` 目录下的文件是否存在。

### `$uri` 相关其他变量

- **`$request_uri`**：包含原始的 URI 和查询字符串，不会在请求过程中被修改。
- **`$document_uri`**：通常与 `$uri` 相同，表示当前请求的 URI，但在某些上下文中可能会有所不同。

### 2. **处理特定类型的静态资源**

可以为不同类型的文件设置不同的处理方式，例如图片、CSS 和 JavaScript 文件。通过 `location` 配置不同路径下的文件如何处理。

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;

    # 静态 HTML 文件
    location / {
        try_files $uri $uri/ =404;
    }

    # 图片文件
    location /images/ {
        root /var/www/media;
        expires 30d;
        add_header Cache-Control "public";
    }

    # CSS 和 JS 文件
    location ~* \.(css|js)$ {
        expires 7d;
        add_header Cache-Control "public, must-revalidate";
        try_files $uri =404;
    }
}
```

- **location**：针对 URL 的不同路径进行匹配，可以为图片、CSS 和 JS 文件等静态资源设置不同的响应方式。
- **expires**：控制资源的缓存过期时间，这样可以减少客户端对服务器的请求，提升加载效率。例如，图片可以缓存较长时间，而 CSS 和 JS 文件可以缓存 7 天。
- **add_header**：用于添加响应头，这里设置 `Cache-Control` 头来告诉浏览器如何缓存资源。

### 3. **浏览器缓存控制**

Nginx 通过 `expires` 和 `Cache-Control` 指令，可以控制静态资源的缓存策略，减少服务器负载。

- **`expires`**：用于指定文件的缓存时间，例如：

  - `expires 1d;` 代表缓存一天。
  - `expires 30d;` 代表缓存 30 天。
  - `expires -1;` 代表禁用缓存。

- **`Cache-Control`**：可以为浏览器添加更多的缓存控制头部，如：
  - `Cache-Control: public`：允许资源被任何缓存服务器缓存。
  - `Cache-Control: private`：只能被客户端缓存。
  - `Cache-Control: no-cache`：告知浏览器每次都需要检查资源是否有更新。
  - `Cache-Control: must-revalidate`：要求缓存必须验证文件是否过期。

示例：

```nginx
location /assets/ {
    root /var/www/html;
    expires 30d;
    add_header Cache-Control "public, max-age=2592000";  # 30天
}
```

### 4. **Gzip 压缩静态资源**

Nginx 可以通过 Gzip 压缩传输的静态文件，如 HTML、CSS、JS，减少传输数据量，提高加载速度。

```nginx
http {
    gzip on;  # 启用 Gzip 压缩
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1024;  # 仅压缩超过 1024 字节的响应
    gzip_buffers 4 16k;
    gzip_comp_level 5;  # 压缩级别
    gzip_http_version 1.1;
    gzip_proxied any;
    gzip_vary on;
}
```

- **gzip on**：开启 Gzip 压缩功能。
- **gzip_types**：定义哪些类型的文件需要进行 Gzip 压缩，常见的有 `text/plain`、`text/css`、`application/javascript` 等。
- **gzip_min_length**：文件大小超过设定值时才进行压缩，默认单位为字节 (bytes)，这里设置为 1024 字节。
- **gzip_comp_level**：压缩级别，范围从 1 到 9，值越大压缩比越高，但 CPU 占用也越多，通常设置为 5。
- **gzip_vary**：允许使用 `Vary: Accept-Encoding` 头部来告知浏览器和代理服务器是否支持压缩。

### 5. **静态资源缓存配置**

除了控制浏览器缓存，还可以在服务器端设置缓存机制，减少重复请求带来的资源消耗。例如 FastCGI 缓存、Proxy 缓存等。

- **文件缓存**：可以通过 `open_file_cache` 提高静态文件读取性能，缓存打开的文件信息。
  ```nginx
  http {
      open_file_cache max=1000 inactive=20s;  # 缓存最多 1000 个文件，20 秒未访问的文件将被移除
      open_file_cache_valid 30s;  # 30 秒后验证缓存
      open_file_cache_min_uses 2;  # 文件被访问 2 次后缓存
      open_file_cache_errors on;  # 缓存文件查找错误信息
  }
  ```

### 6. **ETag 与 Last-Modified 控制**

Nginx 可以通过 `ETag` 和 `Last-Modified` 头来让浏览器缓存和验证文件的有效性。

- **`Last-Modified`**：指示资源的最后修改时间，浏览器可以通过 `If-Modified-Since` 请求头来询问资源是否有变化。
- **`ETag`**：生成文件的唯一标识，浏览器通过 `If-None-Match` 请求头来验证文件是否更新。

示例：

```nginx
location /assets/ {
    root /var/www/html;
    expires 30d;
    etag on;  # 启用 ETag
    add_header Last-Modified $date_gmt;
}
```

### 7. **防盗链与访问控制**

为了防止他人盗用服务器资源，Nginx 可以通过 `valid_referers` 指令来限制资源访问来源。

```nginx
location /images/ {
    valid_referers none blocked example.com *.example.com;
    if ($invalid_referer) {
        return 403;
    }
}
```

- **valid_referers**：指定合法的 `Referer` 来源。`none` 表示允许空 Referer，`blocked` 表示允许 Referer 被代理隐藏的请求。
- **$invalid_referer**：如果请求的 `Referer` 不在 `valid_referers` 中，则返回 403 错误。

### 8. **CORS (跨域资源共享) 配置**

有时静态资源可能需要允许其他域访问，这时可以通过配置 CORS 来允许跨域访问。

```nginx
location /api/ {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Origin, Authorization, Content-Type';
}
```
