#!/bin/bash

run() {
  $APP docker-compose run ${@:1}
}

help() {
  echo "Like 'docker-compose run', but easier to use in different flavors";
}
