#!/bin/bash

run() {
  $APP exec db mysql ${@:1}
}

help() {
  echo "Executes mysql from db service";
}
