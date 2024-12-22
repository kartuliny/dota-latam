FROM node:20 as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --frozen-lockfile
COPY frontend/ ./
RUN npm run build  # Los archivos de build se generarán en /app/dist

FROM nginx:stable-alpine as production-stage

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
