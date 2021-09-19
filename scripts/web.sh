#!/bin/bash

run() {
  $APP exec web bash ${@:1}
}

help() {
  echo "Executes bash from web service";
}
