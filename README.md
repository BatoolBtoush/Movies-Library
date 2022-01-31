# **Task 11**


# Movies-Library


# Project Name - Project Version
"movies-library" -  "1.0.0"  


**Author Name**: Batool Ragaya'h

## WRRC
![20220130_191032](https://user-images.githubusercontent.com/97676785/151709811-51de5fb1-bdf4-4d85-8ee4-d134ff7ec3a7.jpg)







## Overview

## Getting Started

1. Make a directory of where you want to loacte your server
2. run this command `npm init -y` to create a node runtime environment
3. make sure you have the following files in your directory:
     - .eslintric.json : you have to fill it.
     - server.js : you have to work on it.
     - .gitignore : tells you what are the things that you don't want to push when you send your work. And you can fill it from a website, when specifiy *nodes*
4. in the termianl run this commant `npm install express cors` that will create for you these files:
     - node-modules 
     - package-lock.json

5. now to build the server you need to first call the help of *express and cors* by typing these commands in the server file you choose:

`const express = require ('express');`

`const cors = require ('cors');`

`const app = express();`

`app.use(cors());`

6. then continue working on creating end points for your server







## Project Features

1. Has an end point for the *home page* that tells the user about:
    -the movie title
    -the movie poster_path
    -the movie overview

2. a *favorite* end point that tells the user:
"Welcome to Favorite Page"

3. a *status 404* that tells the user:
"page not found error"

4. a *status 500* that tells the user:
    -the status number
    -a message "Sorry, something went wrong"




# **Task 12**

## WRRC:
![20220131_221335](https://user-images.githubusercontent.com/97676785/151866308-9077c435-b343-4b8d-96c1-226be1696e6c.jpg)



## Documentation:

I got my data from a 3rd party API and installed *axios* to help me connect to it.
also created a *.env* file to help me hide certain info from users.




New end points have been added and they are:

- trending page: has information about the trending movies, these information are:
       1. id
       2. title
       3. release_date
       4. poster_path
       5. overview


- search page: has information about the trending movies, these information are:
       1. id
       2. title
       3. release_date
       4. poster_path
       5. overview


- genre page: has information about the trending movies, these information are:
       1. id
       2. name


- providers page: has information about the trending movies, these information are:
       1. iso_3166_1
       2. english_name
       3. native_name
       

