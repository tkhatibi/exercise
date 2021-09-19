#!/bin/bash

run() {
  $APP docker-compose logs -f ${@:1}
}

help() {
  echo "Like 'docker-compose logs', but easier to use in different flavors";
}
