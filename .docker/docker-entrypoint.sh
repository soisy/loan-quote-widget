#!/bin/bash
set -e

# Change uid and gid of node user so it matches ownership of current dir
if [ "$MAP_NODE_UID" != "no" ]; then
    if [ ! -d "$MAP_NODE_UID" ]; then
        MAP_NODE_UID=$PWD
    fi

    uid=$(stat -c '%u' "$MAP_NODE_UID")
    gid=$(stat -c '%g' "$MAP_NODE_UID")

    echo "Running as user node -> UID = $uid / GID = $gid"

    export USER=node

    usermod -u $uid node 2> /dev/null && {
      groupmod -g $gid node 2> /dev/null || usermod -a -G $gid node
    }
fi

echo "**** GOSU node $@ ..."

exec gosu node "$@"
