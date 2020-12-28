#!/bin/sh

target=$1
rsync -ruvzP --delete \
    --exclude='.git' \
    --exclude='sync.sh' \
    --exclude='*~' \
    ./ $target
