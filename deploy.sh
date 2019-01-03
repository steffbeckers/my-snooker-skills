# #!/usr/bin/env bash

# set -o pipefail  # trace ERR through pipes
# set -o errtrace  # trace ERR through 'time command' and other functions
# set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
# set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

# REMOTE=root@dev.steffbeckers.eu # TODO: Change here
# MSS_IMAGE=registry.gitlab.com/mysnookerskills/app # TODO: Change here

# echo " * OPENING DOCKER SOCKET TUNNEL"
# socat \
#   "UNIX-LISTEN:/tmp/docker.sock,reuseaddr,fork" \
#   "EXEC:'ssh -kTax $REMOTE socat STDIO UNIX-CONNECT\:/var/run/docker.sock'" \
#   &
# export DOCKER_HOST=unix:///tmp/docker.sock
# export COMPOSE_PROJECT_NAME=mysnookerskills # TODO: Change here
# echo " * LOGIN WITH GITLAB-CI TOKEN"
# docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN $CI_REGISTRY
# echo " * PULLING NEW IMAGES"
# docker-compose pull
# echo " * UPDATING RUNNING CONTAINERS"
# docker-compose up -d
# #echo " * CLEANING OLD IMAGES"
# #ssh -t ${REMOTE} "docker-clean images"
