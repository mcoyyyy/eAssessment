#!/bin/bash

sed -i "s@\($2.*dev-\)\(.*\)\"@\1$3\"@g" $1