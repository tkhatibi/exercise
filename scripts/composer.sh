#!/bin/bash

run() {
  $APP exec api composer ${@:1} -d api
}

help() {
  echo "Executes composer from api service";
}
