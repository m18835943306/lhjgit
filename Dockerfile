FROM harbor.airqualitychina.cn:2229/public/node:14.16.0-python3.7.2-alpine3.12 AS builder

WORKDIR /opt/web
COPY . ./

ARG deployment_environment

RUN npm config delete proxy \
&& npm config set registry http://registry.npmmirror.com/ \
&& npm install

ENV PATH="./node_modules/.bin:$PATH"

RUN  if [ "$deployment_environment" = "prod" ]; \
    then echo "当前打包环境为:公网环境" && npm run build; \
    elif [ "$deployment_environment" = "bjmemc" ]; \
    then echo "当前打包环境为:监测中心环境" && npm run build && sh bjmemc-dist-sed.sh; \
    elif [ "$deployment_environment" = "test" ]; \
    then echo "当前打包环境为:测试环境" && npm run build:test; \
    else \
    npm run build; \
    fi

FROM nginx:1.21.6-alpine
RUN mkdir -p /data/deploy/bjmemc-electricity/ \
&& rm -f /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf/
COPY ./nginx/bjmemc-electricity.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
COPY --from=builder /opt/web/dist /data/deploy/bjmemc-electricity/dist
