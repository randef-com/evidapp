#!/usr/bin/env bash

set -e
set -o pipefail
set -u

cd "$PROJECT_ROOT" || exit 1

if [[ ${APP_ENV} =~ dev ]]; then
  npm install
fi

exec "$@"
