# Blogtastic, a Z-Prefix application

author: Darius DeSpain (gihub user: darius-despain)

This repo contains a submission for the Z-Prefix CRUD application. The prompt details are below.
## Table of Contents
1. [Prompt Details](#prompt)
    1. [Requirements](#requirements)
    1. [Supplied User Stories](#stories)
1. [Setup](#setup)
    1. [Github](#github)
    1. [Spinning up your own container and database for the first time](#database)
    1. [Install Dependencies](#dependencies)
    1. [Starting up the application](#startup)
1. [Useful Commands](#commands)
1. [Team Members](#members)
## Prompt Details: <a name="prompt"></a>
### Requirements <a name="requirements"></a>
- Your application must be deployed and accessible to the public internet
- Your code must be made available to instructors for grading (via the submission link at the end of this section)
- Your application must use a front-end, back-end, and database
- The database should contain at least two entities, a User and a Post, in a one to many relationship, as shown in the ERD below
- You should style your application in order to lay out components in a sensible way
- You should use the following stories to build out the functionality of your app

### Supplied User Stories <a name="stories"></a>
1. As a blogger I want to be able to create an account so that I can create blogs.
    - The user credentials must be salted and hashed before being stored.
1. As a blogger I want to be able to log into my account so that I can see all the blogs that I have created.
    - After logging in, the blogger should be redirected to all of their blog posts.
1. As a blogger I want to be able to create a new post so that I can share my insights with the world.
    - After the post is created, the blogger should be redirected to all of their blog posts.
    - A post displays title, content, and creation date.
1. As a blogger I want to be able to see all of the posts I have created so that I can track my progress.
    - The blog posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
1. As a blogger I want to be able to see any individual post I have made.
    - The full post should be displayed.
1. As a blogger I want to be able to edit a post so that I can fix any mistakes I made creating it.
    - When the user toggles edit mode, the page remains the same and the fields become editable.
1. As a blogger I want to be able to delete a post so that I can remove any unwanted content.
    - When the user deletes the blog they should be redirected to all of their blog posts.
1. As a visitor I want to be able to view all posts created by all users so that I can consume content.
    - Unauthenticated users should be able to view all posts, and any single post.
    - The posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
1. As a visitor I want to be able to view a specific post created by all users so that I can consume content.
    - Unauthenticated users should be able to view all posts, and any single post.
1. As a blogger I want to be able to view all posts created by all users so that I can see other people’s content.
    - Unauthenticated users should be able to view all posts, and any single post.

## Setup:

clone this repository

    git clone <url>


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


## Setup Troubleshooting

- If you get the message, ```PostgreSQL Database directory appears to contain a database; Skipping initialization```, followed by the error, ``` FATAL:  database "[db name]" does not exist```, then you likely changed the name of the database, which is fine, but you need to re-initialize the database now to make the new name take effect.

  - remove the volume from docker, this will trigger re-initialization. The first way uses compose down and will destroy the volume after it is finished.

        docker-compose down --volumes

  - another method for removing the volume manually

        docker volume ls
        docker volume rm [volumeName]
