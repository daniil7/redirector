FROM node:20-alpine as build-stage

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM node:20-alpine as release-stage

WORKDIR /app

COPY --from=build-stage /app/build /app/build
COPY --from=build-stage /app/package.json /app

RUN npm install --omit=dev && \
    npm cache clean --force && \
    rm -rf /tmp/*

CMD ["node", "build"]
