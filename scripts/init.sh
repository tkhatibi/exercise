#!/bin/bash

help() {
  echo "Initializes the project";
}

run() {
  chmod ugo+rw .env*
  $APP up
  $APP composer install
  $APP console doctrine:database:drop --force --if-exists
  $APP console doctrine:database:create
  $APP console doctrine:migrations:migrate --no-interaction --all-or-nothing
  $APP console lexik:jwt:generate-keypair --skip-if-exists
  $APP console api:openapi:export -o ./web/openapi/openapi.json
  $APP run oag generate -i ./web/openapi/openapi.json -g typescript-axios -o ./web/openapi --skip-validate-spec
  $APP npm i
  $APP npm run dev
}
