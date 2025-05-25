FROM node:18-alpine AS BUILD

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install serve

COPY . .

RUN npm run build

FROM node:18-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/dist /app/dist

EXPOSE 4444

CMD ["serve", "-s", "build", "-l", "4444"]
