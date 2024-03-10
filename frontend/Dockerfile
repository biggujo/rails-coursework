FROM node:18.19.0-slim

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5173

CMD ["yarn", "run", "dev"]
