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
  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }

  server {
    listen 443;
    server_name www.example.com;
    
    ssl on;
    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

    location /someContextPath/websocket/ {
      proxy_pass http://app:8080/websocket/;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /someContextPath/ {
      proxy_pass http://app:8080/;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
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
  RewriteEngine On

  RequestHeader set Connection "Upgrade" env=WEBSOCKET
  RequestHeader set Upgrade "WebSocket" env=WEBSOCKET

  RewriteCond %{REQUEST_URI} ^.*/websocket.* [NC]
  RewriteRule .* ws://nginx:80%{REQUEST_URI} [E=WEBSOCKET,NE,P]
  RewriteRule .* http://nginx:80%{REQUEST_URI} [NE,P]
</VirtualHost>
```

nginx:
```
http {
  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }

  server {
    listen 80;
    server_name www.example.com;

    location /someContextPath/websocket/ {
      proxy_pass http://app:8080/websocket/;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /someContextPath/ {
      proxy_pass http://app:8080/;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-Prefix "/someContextPath";
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}
```
