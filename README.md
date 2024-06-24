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
