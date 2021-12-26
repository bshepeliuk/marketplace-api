#!/bin/bash

cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_AUTH_TOKEN
machine git.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_AUTH_TOKEN
EOF
