#Tento docker file a nginx.conf jsem psal s pomocí ChatGPT (OpenAI, verze 5.1)
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
ENV VITE_API_URL=/api
RUN npm run build


FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
