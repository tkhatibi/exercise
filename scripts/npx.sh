#!/bin/bash

run() {
  $APP exec web npx ${@:1}
}

help() {
  echo "Executes npx from web service";
}
