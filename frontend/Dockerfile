FROM nginx:alpine

# Install envsubst (gettext) for variable substitution
RUN apk add --no-cache gettext

WORKDIR /usr/share/nginx/html

# Copy nginx config and site files
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# At container start, render config template then start nginx
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/js/config.template.js > /usr/share/nginx/html/assets/js/config.js && nginx -g 'daemon off;'"]
