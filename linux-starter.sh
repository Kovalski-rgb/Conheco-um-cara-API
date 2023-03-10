#!/bin/bash

# Color variables
red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
blue='\033[0;34m'
magenta='\033[0;35m'
cyan='\033[0;36m'
# Clear the color after that
clear='\033[0m'

echo -e "${red}Starting all nodes servers${clear}"
npm start --prefix authServer/ &
AUTH_SERVER_PID=$!
npm start --prefix communityServer/ &
COMMUNITY_SERVER_PID=$!
echo -e "${red}!!! - Press enter or CTRL + C to stop all servers${clear}"
read
kill $AUTH_SERVER_PID
kill $COMMUNITY_SERVER_PID
