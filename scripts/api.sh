#!/bin/bash

run() {
  $APP exec api sh ${@:1}
}

help() {
  echo "Executes sh from api service";
}
