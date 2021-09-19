#!/bin/bash

run() {
  $APP docker-compose config ${@:1}
}

help() {
  echo "Like 'docker-compose config', but easier to use in different flavors";
}
