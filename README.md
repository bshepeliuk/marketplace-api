# Deploy dockerized Node app to Heroku with CircleCI

[![CircleCI](https://circleci.com/gh/bshepeliuk/dockerized-node-deploy/tree/main.svg?style=svg&circle-token=d6a66bf4426fe5b9f832aa4de64edc2830ec2391)](https://circleci.com/gh/bshepeliuk/dockerized-node-deploy/tree/main)

1. [Container Registry & Runtime (Docker Deploys)](https://devcenter.heroku.com/articles/container-registry-and-runtime#logging-in-to-the-registry)
2. [From inside of a Docker container, how do I connect to the localhost of the machine?](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)
3. [Deploy to Heroku](https://circleci.com/developer/orbs/orb/rise/deploy-to-heroku)
4. [Node.Js + PostgreSQL + Heroku Error: No pg_hba.conf entry for host, SSL off](https://catalins.tech/nodejs-postgresql-heroku-error-no-pghbaconf-entry-for-host-ssl-off)

**CircleCI environments**

`$HEROKU_EMAIL`= email from your Heroku account

`$HEROKU_APP_NAME`= heroku apps:info | grep "Web URL" --> https://`HEROKU_APP_NAME`.herokuapp.com/

`$HEROKU_AUTH_TOKEN`= bash heroku auth:token

**Deploy**

`docker login --username=heroku@your.email --password=$(heroku auth:token) registry.heroku.com`

`heroku create HEROKU_APP_NAME`

`heroku addons:create heroku-postgresql:hobby-dev`

`heroku container:push web -a HEROKU_APP_NAME`

`heroku container:release web -a HEROKU_APP_NAME`

**Generate models using sequelize**

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

**TLDR**

Use `--network="host"` in your docker run command, then `127.0.0.1` in your docker container will point to your docker host.

`docker run --network="host" -d -p 3000:3000 IMAGE_NAME | IMAGE_ID`

`heroku config:set PGSSLMODE=no-verify`
