#!/bin/bash

export ROOT_PATH=$(cd $(dirname "$0") && pwd)

export APP=$ROOT_PATH/app

export OS=$(uname)

if [[ -z "${PROJECT_FLAVOR}" ]]; then
  export PROJECT_FLAVOR=dev
fi

export PROJECT_NAME="exercise-$PROJECT_FLAVOR"

export DOCKER_COMPOSE=$ROOT_PATH/docker-compose.$PROJECT_FLAVOR.yml

# Setting ENV variables

__export_file_env_vars() {
  ENV_PATH=${1}
  if [ ! -f "$ENV_PATH" ]; then
    echo "Env file not found: $ENV_PATH"
  elif [ ! -s "$ENV_PATH" ]; then
    echo "Env file skipped duo to being empty: $ENV_PATH"
  elif [ "$OS" = 'Linux' ]; then
    export $(grep -v '^#' $ENV_PATH | xargs -d '\n')
  elif [ "$OS" = 'FreeBSD' ]; then
    export $(grep -v '^#' $ENV_PATH | xargs -0)
  fi
}

if [[ ! -v EXPORTED ]] ; then
  __export_file_env_vars $ROOT_PATH/.env
  __export_file_env_vars $ROOT_PATH/.env.local
  __export_file_env_vars $ROOT_PATH/.env.$PROJECT_FLAVOR
  __export_file_env_vars $ROOT_PATH/.env.$PROJECT_FLAVOR.local
  export EXPORTED=true
fi

# Handling related command

COMMAND=${1}
ARGS=${@:2}
SCRIPT_EXISTS=false
IS_RUN=false

if [ ${1} = "help" ]; then
  COMMAND=${2}
  if [ -f "$ROOT_PATH/scripts/${2}.sh" ]; then
    SCRIPT_EXISTS=true
  fi
elif [ -f "$ROOT_PATH/scripts/${1}.sh" ]; then
  IS_RUN=true
  SCRIPT_EXISTS=true
fi

if $SCRIPT_EXISTS ; then
  source "$ROOT_PATH/scripts/$COMMAND.sh"
  if $IS_RUN ; then
    run $ARGS
  else
    help
  fi
else
  if [ "$COMMAND" != "" ]; then
    echo "Command '$COMMAND' does not exist."
  fi
  echo "Available commands:"
  for scriptFileName in $ROOT_PATH/scripts/*
  do
    source $scriptFileName
    echo "  $(basename $scriptFileName .sh)"
    echo "  $(help)"
    echo ''
  done
fi
