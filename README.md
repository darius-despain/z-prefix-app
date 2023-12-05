# Blogtastic, a Z-Prefix application

author: Darius DeSpain (gihub user: darius-despain)
## Table of Contents
1. [Introduction](#introduction)
1. [Prompt Details](#prompt-details)
    1. [Requirements](#requirements)
        1. [ERD](#erd)
    1. [Supplied User Stories](#supplied-user-stories)
1. [Noteworthy Mentions](#noteworthy-mentions)
    1. [Additional Features](#additional-features)
    1. [Fun Additions](#fun-additions)
    1. [Future Work](#future-work)
1. [Local Setup](#local-setup)
    1. [Docker-Compose](#docker-compose)
    1. [Setup Troubleshooting](#setup-troubleshooting)

## Introduction:
This repo contains a submission for the Z-Prefix CRUD application. The prompt details are listed in the [Prompt Details](#prompt-details) section.

## Prompt Details:
### Requirements:
- Your application must be deployed and accessible to the public internet
- Your code must be made available to instructors for grading (via the submission link at the end of this section)
- Your application must use a front-end, back-end, and database
- The database should contain at least two entities, a User and a Post, in a one to many relationship, as shown in the ERD below
- You should style your application in order to lay out components in a sensible way
- You should use the following stories to build out the functionality of your app
#### ERD:
![alt text](https://s3.us-west-2.amazonaws.com/forge-production.galvanize.com/content/fd0967e6064de2eb7a057ddb0607c21c.png "ERD")

### Supplied User Stories:
1. As a blogger I want to be able to create an account so that I can create blogs.
    - The user credentials must be salted and hashed before being stored.

        > I utilized bcrypt to salt and hash using bcrypt.hash with a provided salt length, then compare passwords later using bcrypt.compare. (api/src/app.js, Line 203)

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

        > The url remains the same, appearance is slightly different for more aesthetically pleasing form fields. The edit button toggles the editView state on the same <Blogdetails> component. (ui/src/components/Blogdetails.js, various lines)

1. As a blogger I want to be able to delete a post so that I can remove any unwanted content.
    - When the user deletes the blog they should be redirected to all of their blog posts.
1. As a visitor I want to be able to view all posts created by all users so that I can consume content.
    - Unauthenticated users should be able to view all posts, and any single post.
    - The posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
1. As a visitor I want to be able to view a specific post created by all users so that I can consume content.
    - Unauthenticated users should be able to view all posts, and any single post.
1. As a blogger I want to be able to view all posts created by all users so that I can see other people’s content.
    - Unauthenticated users should be able to view all posts, and any single post.

## Noteworthy Mentions:

### Additional Features:
Though not required, I implemented the following because I felt they were necessary for a useful application.

- Profile page (supported with API endpoints)
    - View profile information
    - Edit profile information including changing password
    - Delete profile

- Logout button (refreshing the page also has the same effect)

- Automatic Heroku Deployment
    - This github repo is equipped with a `main.yml` file that allowed me to seemlessly deploy my application automatically each time it was pushed to github. This made it much easier to deploy the application and allows me to use this as a scaffold for future full-stack applications that need deploying.

### Fun Additions:
These were the things I had a little more fun with while creating this application. Enjoy

- Lightsaber Fighting Loading Spinner
    - I noticed that at times it would take a while on the deployed app to get the database information from the API so I added a gif to be shown when we are currently waiting on data from the database. See  below for a touch of fun.
    ![alt text](https://thumbs.gfycat.com/DemandingLegalFeline-max-1mb.gif "Lightsaber Fighting Loading Spinner")

- Database seeded data contains Starwars-related posts
    - I am a big Starwars fan, so to get some data for the initial posts I used some of the movies for some inspiration. Check them out!

### Future Work:
All applications are never truly finished. Although, I did my best to make this a well-rounded application, below is a list of ideas to implement that I did not get around to.
- Cookies to track login sessions
    - Currently Blogtastic relies upon the react state to keep user data, so when the page is refreshed, this data goes away. Giving users a cookie to keep them logged in even after a refresh would enhance this experience.
- Additional data validation
    - I incorporated the data validation I thought necessary to ensure the API would not crash and it would store the data in the database correctly, however, there can always be more thorough data validation for things such as usernames/passwords being of certain character types.
- Additional confirmation windows for navigating off a form page
    - I implemented a pop-up for switching off of edit mode when you've edited a form, but this would be nice to have when trying to navigate to anywhere else on the site so the user is aware that they will lose their form data.
- Dynamic character limit feedback
    - Blogtastic gives feedback upon submission if the data does not meet criteria, but showing the feedback in real time as the user is typing say a blog post and notifying them that they have used **n/1000** available characters might enhance the user experience

## Local Setup:
### Docker-Compose:

clone this repository

    git clone <url>


install dependencies for the api prior to docker-compose

    npm install

install docker and docker-compose on your desktop if you havent already.
- Visit https://docs.docker.com/get-docker/ for more information

check docker is running in the command line

    docker -v

build app using docker-compose (must be in root directory of this repo)

    docker-compose up

You can now view the application at the following URLs

 - UI: localhost:3000

 - API: localhost:8080

When you're done, you can bring down the application with `CTRL+C` or if you ran `docker-compose up` with a `-d` flag then run another docker-compose command to stop

    docker-compose down


### Setup Troubleshooting:

- If you get the message, ```PostgreSQL Database directory appears to contain a database; Skipping initialization```, followed by the error, ``` FATAL:  database "[db name]" does not exist```, then you likely changed the name of the database, which is fine, but you need to re-initialize the database now to make the new name take effect.

  - remove the volume from docker, this will trigger re-initialization. The first way uses compose down and will destroy the volume after it is finished.

        docker-compose down --volumes

  - another method for removing the volume manually

        docker volume ls
        docker volume rm [volumeName]
