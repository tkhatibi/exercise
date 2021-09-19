#!/bin/bash

run() {
  # --rmi all => Remove all images used by any service.
  # -v => Remove named volumes declared in the `volumes` section of the Compose file and anonymous volumes attached to containers.
  # $APP docker-compose down -v --remove-orphans --rmi all
  $APP docker-compose down -v --remove-orphans ${@:1}
}

help() {
  echo "Like 'docker-compose down', but easier to use in different flavors";
}
