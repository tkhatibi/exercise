#!/bin/bash

run() {
  $APP docker-compose ps ${@:1}
}

help() {
  echo "Like 'docker-compose ps', but easier to use in different flavors";
}
