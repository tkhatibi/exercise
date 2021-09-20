#!/bin/bash

run() {
  $APP exec web sh ${@:1}
}

help() {
  echo "Executes sh from web service";
}
