limit_req_zone $binary_remote_addr zone=site_remote_addr_limit:20m rate=12r/s;

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.royalauction.io;
    ssl_certificate /etc/ssl/royalauction.io/cert.pem;
    ssl_certificate_key /etc/ssl/royalauction.io/key.pem;
    ssl_client_certificate /etc/ssl/cloudflare.crt;
    ssl_verify_client on;
    client_max_body_size 50M;

    access_log /var/log/nginx/site.net.access.log;
    error_log /var/log/nginx/site.net.error.log;

    error_page 404 = @404;
    location @404 {
        default_type application/json;
        return 404 '{"success":false,"message":"Not Found Method"}\n';
    }

    error_page 429 = @429;
    location @429 {
        default_type application/json;
        return 429 '{"success":false,"message":"Too Many Requests"}\n';
    }

    error_page 502 = @502;
    location @502 {
        default_type application/json;
        return 502 '{"success":false,"message":"Bad Gateway"}\n';
    }

    limit_req zone=site_remote_addr_limit burst=10 nodelay;
    limit_req_log_level warn;
    limit_req_status 429;
    limit_conn_status 429;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_pass http://localhost:8000;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name royalauction.io;
    ssl_certificate /etc/ssl/royalauction.io/cert.pem;
    ssl_certificate_key /etc/ssl/royalauction.io/key.pem;
    ssl_client_certificate /etc/ssl/cloudflare.crt;
    ssl_verify_client on;
    client_max_body_size 50M;

    access_log /var/log/nginx/site.net.access.log;
    error_log /var/log/nginx/site.net.error.log;

    error_page 404 = @404;
    location @404 {
        default_type application/json;
        return 404 '{"success":false,"message":"Not Found Method"}\n';
    }

    error_page 429 = @429;
    location @429 {
        default_type application/json;
        return 429 '{"success":false,"message":"Too Many Requests"}\n';
    }

    error_page 502 = @502;
    location @502 {
        default_type application/json;
        return 502 '{"success":false,"message":"Bad Gateway"}\n';
    }

    limit_req zone=site_remote_addr_limit burst=10 nodelay;
    limit_req_log_level warn;
    limit_req_status 429;
    limit_conn_status 429;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_pass http://localhost:3000;
    }
}
