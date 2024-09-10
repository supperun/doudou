# Nginx

Nginx 是一个高性能的 HTTP 和反向代理服务器。它以高并发、高稳定性、低资源消耗闻名，广泛用于 Web 服务器和反向代理等场景。以下是 Nginx 的一些必知必会的核心知识点：

### 1. **Nginx 基础架构**

- **Master-Worker 模型**：Nginx 采用 Master-Worker 模型，Master 进程负责管理 Worker 进程，Worker 进程执行具体的请求处理。
- **异步非阻塞架构**：Nginx 使用事件驱动机制，异步处理请求，可以处理大量的并发连接。

### 2. **Nginx 常用指令**

- **启动 Nginx**：`nginx`
- **停止 Nginx**：
  - 快速停止：`nginx -s stop`
  - 优雅停止：`nginx -s quit`
- **重新加载配置**：`nginx -s reload`
- **查看 Nginx 状态**：`nginx -t` 检查配置文件是否有错误
- **重新启动 Nginx**：先停止再启动，也可以直接使用 `nginx -s reload`

### 3. **Nginx 配置文件结构**

- **主配置文件**：默认路径为 `/etc/nginx/nginx.conf` 或 `/usr/local/nginx/conf/nginx.conf`，由多个指令块组成。
- **指令块**：
  - **全局块**：定义全局的配置，如用户、Worker 进程数、日志位置等。
  - **Events 块**：定义与网络连接相关的配置，如最大连接数、事件驱动模型等。
  - **HTTP 块**：包含处理 HTTP 请求的相关配置，如虚拟主机、日志、代理等。
  - **Server 块**：定义虚拟主机，每个 Server 可以绑定多个域名。
  - **Location 块**：用于匹配 URL，定义如何处理请求路径。

### 4. **反向代理与负载均衡**

- **反向代理**：Nginx 可以作为反向代理，将客户端的请求转发到后端服务器。配置示例：

  ```nginx
  server {
      listen 80;
      server_name example.com;

      location / {
          proxy_pass http://backend_server;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }
  ```

- **负载均衡**：Nginx 支持多种负载均衡策略，如轮询、权重、IP 哈希等。

  ```nginx
  upstream backend {
      server backend1.example.com;
      server backend2.example.com;
  }

  server {
      location / {
          proxy_pass http://backend;
      }
  }
  ```

  - **轮询**：默认策略，依次将请求分配给后端服务器。
  - **权重**：可以设置不同服务器的权重。
  - **IP 哈希**：根据客户端 IP 分配请求到特定服务器。

### 5. **静态资源处理**

Nginx 可高效处理静态资源，如 HTML、CSS、JS、图片等，通常用作静态资源服务器。

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/html;
        index index.html index.htm;
    }
}
```

### 6. **SSL/TLS 配置**

- **HTTPS**：Nginx 可以用作 HTTPS 服务器，配置 SSL 证书。

  ```nginx
  server {
      listen 443 ssl;
      server_name example.com;

      ssl_certificate /path/to/certificate.crt;
      ssl_certificate_key /path/to/certificate.key;
      ssl_protocols TLSv1.2 TLSv1.3;
      ssl_ciphers HIGH:!aNULL:!MD5;
  }
  ```

### 7. **Gzip 压缩**

Nginx 支持 Gzip 压缩，减少传输内容大小，提高传输效率。

```nginx
http {
    gzip on;
    gzip_types text/plain application/javascript text/css;
    gzip_min_length 1000;
}
```

### 8. **日志配置**

Nginx 支持访问日志和错误日志，常用于问题排查和性能分析。

```nginx
http {
    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;
}
```

### 9. **缓存与静态资源优化**

- **FastCGI 缓存**：用于动态内容缓存，减少后端服务器压力。
  ```nginx
  fastcgi_cache_path /var/cache/nginx levels=1:2 keys_zone=mycache:10m;
  server {
      location ~ \.php$ {
          fastcgi_cache mycache;
          fastcgi_cache_valid 200 60m;
      }
  }
  ```
- **浏览器缓存控制**：通过 `Expires` 和 `Cache-Control` 控制浏览器缓存策略。
  ```nginx
  location /images/ {
      expires 30d;
      add_header Cache-Control "public";
  }
  ```

### 10. **监控与日志分析**

- 通过第三方工具如 ELK (Elasticsearch, Logstash, Kibana) 或 Grafana 监控 Nginx 的日志和性能指标，实时掌握服务运行状态。

---

Nginx 的灵活性和高效性使它成为服务器领域的主力工具，掌握这些基本知识点可以帮助你在各种场景下高效使用 Nginx。
