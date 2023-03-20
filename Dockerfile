FROM node:19-bullseye as builder

WORKDIR /usr/app
COPY ./build ./

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "./index.js"]
