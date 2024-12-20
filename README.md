# Dune
This repository was created for the Web Development final project.

## Prophet Web Application

Prophet is a single page web application design to immerse users in the Dune Universe, offering information about the author, books and movies. This application allows user to learn a bit more about Dune and track their progress with books and movies.

### Features
> **1. Home Page**
>> Here users can learn more about the universe of Dune.

> **2.Author**
>> Includes a small biography of the author, so user can learn more about Frank Herbert.

> **3. Book Planner**
>> Includes synopses of each book.

> **4. Movie Planner**
>> Includes synopses of each movie.

> **5. Login/Register**
>> Users can register and log in on the app.

## Instructions For Running 
Before running the app, make sure you have the following things installed:
> node.js
> npm
> MongoDB

1. Clone Repository
> Clone the repository to your local machine.
>> Terminal (Open your terminal and run the following command):
>> git clone https://github.com/Tomefs/Dune.git
>> Visual Studio Code (Choose Clone Git Repository, and use the folllowing URL):
>> https://github.com/Tomefs/Dune.git

2. Navigate Project Directory
>  Open your terminal if you haven't already.
> cd Dune 

3. Install Dependencies
> Open dependencies inside the project Folder.
> npm install

4. Start the Data Base
> mongod --dbpath data --port 6001

5. Start the Server
> node server.js
