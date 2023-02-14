FROM node:alpine
WORKDIR /usr/src/app
COPY ./package* /usr/src/app/
RUN npm install
COPY ./ /usr/src/app/
RUN npm run build
RUN npm install -g serve
CMD ["npx", "serve", "-s", "build"]
