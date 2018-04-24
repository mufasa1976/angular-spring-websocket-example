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