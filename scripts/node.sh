#!/bin/bash

run() {
  $APP exec web node ${@:1}
}

help() {
  echo "Executes node from web service";
}
