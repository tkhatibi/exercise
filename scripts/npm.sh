#!/bin/bash

run() {
  $APP exec web npm ${@:1}
}

help() {
  echo "Executes npm from web service";
}
