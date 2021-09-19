#!/bin/bash

run() {
  $APP docker-compose up -d --build ${@:1}
}

help() {
  echo "Like 'docker-compose up', but easier to use in different flavors";
}
