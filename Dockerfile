# Node Block

FROM node:alpine3.16 as nodework
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


# Nginx Block

FROM nginx:1.23-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=nodework /app/build /usr/share/nginx/html

# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*

# ENTRYPOINT [ "nginx" , "-g" , "daemon off ;" ]



