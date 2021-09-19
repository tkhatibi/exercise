#!/bin/bash

run() {
  docker-compose -p $PROJECT_NAME -f $DOCKER_COMPOSE ${@:1}
}

help() {
  echo "Like 'docker-compose', but easier to use in different flavors";
}
