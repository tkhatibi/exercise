#!/bin/bash

run() {
  $APP exec api composer ${@:1}
}

help() {
  echo "Executes composer from api service";
}
