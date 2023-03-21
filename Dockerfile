FROM node:19-bullseye as builder

WORKDIR /usr/app
COPY . .

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "build/index.js"]
