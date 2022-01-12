#!/bin/sh

npx sequelize-cli db:migrate:undo:all
npm run migrate
node src/server
