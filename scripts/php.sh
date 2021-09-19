#!/bin/bash

run() {
  $APP exec api php ${@:1}
}

help() {
  echo "Executes php from api service";
}
