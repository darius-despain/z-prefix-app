# Full Stack Application scaffold

This repo is designed to aid in speeding up development of a full-stack application by giving a running scaffold with a react front-end, express server, and datbase.

## To set up application:

clone this repository

    git clone <url>

Replace placeholders in docker-compose.yml
- several lines read REPLACE_ME, replace them with appropriate values

*Not sure why we need this next step, but it doesn't work without it*

install dependencies for the api prior to docker-compose

    npm install

install docker on your desktop if you havent already.
- Visit https://docs.docker.com/get-docker/ for more information

check docker is running in the command line

    docker -v

build app using docker-compose (must be in root directory of this repo)

    docker-compose up

You can now view the application at the following URLs

 - UI: localhost:3000

 - API: localhost:8080

author: Darius DeSpain (gihub user: darius-despain)