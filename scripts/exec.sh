#!/bin/bash

run() {
  $APP docker-compose exec ${@:1}
}

help() {
  echo "Like 'docker-compose exec', but easier to use in different flavors";
}
