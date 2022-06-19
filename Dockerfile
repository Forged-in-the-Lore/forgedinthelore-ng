#stage 1
FROM node:latest as node
WORKDIR /forgedinthelore-ng
COPY . .
RUN npm ci && npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /forgedinthelore-ng/dist/forged-in-the-lore /usr/share/nginx/html
EXPOSE 80
EXPOSE 443

# Stage 1: Build an Angular Docker Image
FROM node as build
WORKDIR /apps
COPY . .
RUN npm install
COPY . /apps
ARG configuration=production
RUN npm run build - - outputPath=./dist/out - configuration $configuration
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY /nginx-custom.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY - - from=build /apps/dist/out/ /usr/share/nginx/html
# Copy the EntryPoint
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh
ENTRYPOINT ["sh”,”/entryPoint.sh"]
CMD ["nginx”, “-g”, “daemon off;"]
