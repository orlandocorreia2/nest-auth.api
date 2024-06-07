#!/bin/bash

cp .env.example .env 

npm install

npm run migration:run

# tail -f /dev/null

npm run start:dev