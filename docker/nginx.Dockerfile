FROM nginx:1.26.2-alpine
COPY nginx.site.conf /etc/nginx/conf.d/nginx.site.conf