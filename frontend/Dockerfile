FROM nginx:alpine

# Install envsubst (gettext) for variable substitution
RUN apk add --no-cache gettext

WORKDIR /usr/share/nginx/html

# Define default necessary environment variables
ENV BACKEND_URL=http://127.0.0.1
ENV BACKEND_PORT=8080

# Copy nginx config and site files
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# At container start, render config template restricting replacement to specific env variables, then start nginx
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_URL} ${BACKEND_PORT}' < /usr/share/nginx/html/assets/js/config.template.js > /usr/share/nginx/html/assets/js/config.js && nginx -g 'daemon off;'"]
