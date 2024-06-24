# Переадресатор и точка

# How to build

```
docker build \
    -t redirector \
    -f docker/Dockerfile .
```

# How to run

```
docker run \
    --env-file=.env \
    --rm \
    --name=redirector \
    -p 3000:3000 \
    --mount type=bind,source="$(pwd)"/database,target=/app/database \
    --detach \
    danil7/redirector
```

# Nginx reverse proxy config example

```
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    location / {
        proxy_pass 1.2.3.4:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header True-Client-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    # protect admin panel with password
    location /_utils {
        proxy_pass 1.2.3.4:80;
        proxy_http_version 1.1;
        proxy_redirect / /_utils/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header True-Client-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;

        auth_basic "Restricted";
        auth_basic_user_file /etc/nginx/htpasswd;
    }
}
```

