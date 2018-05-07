## Apache Reverse Proxy for WebSocket
The following Modules should be enabled on Apache httpd:
* proxy
* proxy_http
* proxy_wstunnel
* headers
* ssl
```
<VirtualHost *:443>
  DocumentRoot "/var/www/html/"
  ServerName www.example.com

  SSLEngine on
  SSLCertificateFile "/etc/apache2/ssl/server.crt"
  SSLCertificateKeyFile "/etc/apache2/ssl/server.key"

  ProxyPreserveHost On

  <Location /someContextPath>
    ProxyPass http://app:8080
    RequestHeader set X-Forwarded-Prefix "/someContextPath"
  </Location>

  <Location /someContextPath/websocket>
    ProxyPass ws://app:8080/websocket
    RequestHeader set X-Forwarded-Prefix "/someContextPath"
  </Location>
</VirtualHost>
```
## Nginx Reverse Proxy for WebSocket
nginx should be compiled with the http-proxy Module.
```
http {
  server {
    listen 443;
    server_name www.example.com;
    
    ssl on;
    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;
    
    location /someContextPath/websocket/ {
      proxy_pass http://app:8080/websocket/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
    }
    
    location /someContextPath/ {
      proxy_pass http://app:8080/;
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
    }
  }
}
```
## behind 2 Proxies (Apache as Front-Proxy)
apache:
```
<VirtualHost *:443>
  DocumentRoot "/var/www/html/"
  ServerName www.example.com

  SSLEngine on
  SSLCertificateFile "/etc/apache2/ssl/server.crt"
  SSLCertificateKeyFile "/etc/apache2/ssl/server.key"

  ProxyPreserveHost On

  <Location "/">
    ProxyPass http://nginx:80/
  </Location>

  <Location ~ ".*/websocket.*">
    ProxyPass ws://nginx:80/
  </Location>
</VirtualHost>
```

nginx:
```
http {
  server {
    listen 80;
    server_name www.example.com;
    
    location /someContextPath/websocket/ {
      proxy_pass http://app:8080/websocket/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
    }
    
    location /someContextPath/ {
      proxy_pass http://app:8080/;
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
    }
  }
}
```