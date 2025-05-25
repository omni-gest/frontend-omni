FROM node:18-alpine AS BUILD

WORKDIR /app

COPY package.json .
COPY package-lock.json . 

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS PRODUCTION

WORKDIR /app

RUN npm install -g serve

COPY --from=BUILD /app/dist /app/dist

EXPOSE 4444

CMD ["serve", "-s", "dist", "-l", "4444"]
