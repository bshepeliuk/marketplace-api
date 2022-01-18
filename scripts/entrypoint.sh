#!/bin/sh

npx sequelize-cli db:migrate:undo:all
npm run migrate
npx sequelize-cli db:seed:all
node src/server
