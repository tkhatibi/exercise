#!/bin/bash

run() {
  $APP exec api api/bin/console ${@:1}
}

help() {
  echo "Executes console from api service";
}
