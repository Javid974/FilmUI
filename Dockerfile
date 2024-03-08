# Étape de construction
FROM node:14 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape d'exécution
FROM nginx:alpine
COPY --from=build-step /app/dist/films /usr/share/nginx/html
