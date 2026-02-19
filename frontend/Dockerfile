FROM nginx:alpine
RUN apk add --no-cache gettext
RUN rm -rf /usr/share/nginx/html/*
ENV BACKEND_URL=http://127.0.0.1
ENV BACKEND_PORT=8080
COPY assets/ /usr/share/nginx/html/assets/
COPY components/ /usr/share/nginx/html/components/
COPY templates/ /usr/share/nginx/html/templates/
COPY *.html robots.txt sitemap.xml /usr/share/nginx/html/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_URL} ${BACKEND_PORT}' < /usr/share/nginx/html/assets/js/config.template.js > /usr/share/nginx/html/assets/js/config.js && envsubst '${BACKEND_URL} ${BACKEND_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
