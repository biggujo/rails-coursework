FROM node:20.13.1-slim

WORKDIR /app

COPY package.json .

RUN yarn

RUN mkdir .git

COPY ../.git/ ./.git/
COPY  ../commitlint.config.js ./

CMD ["/bin/sh"]
