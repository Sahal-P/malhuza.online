FROM nginx:latest

COPY /config/nginx.conf /etc/nginx/sites-enabled/

