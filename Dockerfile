FROM nginx:alpine
COPY dist/vuexy /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
