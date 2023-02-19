
FROM node:14.18-alpine3.12 as node

# Builder stage

FROM node as builder
# use /app as the CWD
WORKDIR /app
# copy package.json and package-lock.json to /app
COPY package*.json ./
# install all dependencies
RUN npm install
# copy the rest of the code
COPY . .

RUN npm run build

# final stage

FROM node as final

ENV NODE_ENV=production
# prepare a destination directory for js files
RUN mkdir -p /app/src
# use /app as CWD
WORKDIR /app
# copy package.json and package-lock.json
COPY package*.json ./
# install only production dependencies
RUN npm i --only=production
# copy transpiled js from "builder" stage into the "final" image
COPY --from=builder ./app/dist ./src

COPY .sequelizerc_docker .sequelizerc

COPY ./scripts/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "./entrypoint.sh"]
