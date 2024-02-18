FROM nginx:1.21.1-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /config/nginx.conf /etc/nginx/conf.d

FROM nginx:latest
RUN apt-get update && apt-get upgrade -y
RUN apt-get install wget unzip -y
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/sites-enabled/
ADD https://bootstrapmade.com/content/templatefiles/Ninestars/Ninestars.zip .
RUN unzip Ninestars.zip
RUN mv Ninestars/* .
RUN rm -rf Ninestars Ninestars.zip

# Copy SSL certificate and private key
COPY fullchain.pem /etc/nginx/ssl/www.malhuza.asyncawait.online/fullchain.pem
COPY privkey.pem /etc/nginx/ssl/www.malhuza.asyncawait.online/privkey.pem

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]