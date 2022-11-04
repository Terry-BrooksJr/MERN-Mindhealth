#!/bin/bash

# # Install NPM
# echo "Installing NPM"
# su apt-get install npm
 
# This script is used to install reaquired packages for the File./

echo "Installing required Front-End packages for the File Server"
cd /MindHealth-Chicago/frontend
npm install -g

echo "Installing required Back-End packages for the File Server"
cd ~
cd /MindHealth-Chicago/backend
npm install -g

