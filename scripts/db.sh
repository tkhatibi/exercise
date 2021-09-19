#!/bin/bash

run() {
  $APP exec db bash ${@:1}
}

help() {
  echo "Executes bash from db service";
}
