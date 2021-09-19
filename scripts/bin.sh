#!/bin/bash

run() {
  $APP php api/vendor/bin/${@:1}
}

help() {
  echo "Executes api/vendor/bin binaries from php service of api";
}
