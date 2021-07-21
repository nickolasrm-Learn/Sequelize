# Sequelize-1 TODO

![Build](https://github.com/nickolasrm-Learn/Sequelize-1-TODO/actions/workflows/build.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/nickolasrm-Learn/Sequelize-1-TODO/badge.svg?branch=main)](https://coveralls.io/github/nickolasrm-Learn/Sequelize-1-TODO?branch=main)

_A TODO list API made with sequelize and express_

## What is Sequelize
Sequelize is an ORM. Which means it is a bridge between your database engine and the software you are building. You may have thought it is a connector, but an ORM has a higher level of abstraction. Instead of writing queries by hand, Sequelize handles this operation for you. This can avoid possible failures and attacks arising from manual written queries.

## What is an API
An API is an interface for a software to communicate with another. In this case, an API is used to manipulate a db through the use of an Express server

## Express API communication
Express uses the HTTP protocol and its requests to communicate. In reason of that, four actions can be performed:

* **GET:** Used for getting something from an API host. In this case, GET requests return an array with all todo items.

* **POST:** Used for putting something into an API host. In this case, POST requests add todo items into the database.

* **DELETE:** Used for deleting something from an API host. In this case, DELETE requests delete items from the database.

* **PUT:** Used for updating something into an API host. In this case, PUT requests, update items into the database.

## Usage
1. Make sure you have [Node and npm](https://nodejs.org/en/) installed
2. With a terminal opened at the project folder, run `npm install`
3. Install [Docker](https://www.docker.com/)
4. Run `docker-compose up` and wait for postgres to be installed
5. After installing, run `npm start`
6. Install a software that can make HTTP requests (optional), such as [Postman](https://www.postman.com/downloads/)
7. Make requests for `localhost:3000`

## How to make requests
As mentioned earlier, requests can be performed with any of the four methods. But HTTP requests need to have a specific format to work (headers and type of data passed).

* **GET:** To retrieve items from the items table you should make a GET request . No additional headers, params or body is required. You only need to accept a  `json` as its answer, something you don't need to worry with `Postman`.

* **POST:** To insert items into the items table, make a POST request, add a header line with `key` = `Content-Type` and `value` = `application/json`. Also, you have to pass the description of this todo item. To do this, you should send a `json` body in this format: `{ description: 'YOUR DESCRIPTION' }`. If using postman, just select `raw` and type this.

* **PUT:** To update items into the items table you should make PUT request, add a header line with `key` = `Content-Type` and `value` = `application/json`. Also, you have to pass the id of the item you want to edit, and its new content. To do this, you should send a `json` body in this format: `{ id: ENTRY_ID, description: 'YOUR NEW DESCRIPTION', completed: BOOLEAN }`. If using postman, just select `raw` and type this changing the parameters.

* **DELETE:** To delete an item, make a DELETE request, add a header line with `key` = `Content-Type` and `value` = `application/json`. You should add the id of the item you want to delete into the request body. it should be a `json`  in this format: `{ id: ENTRY_ID }`. If using postman, just select `raw` and type this changing the parameters.

## I want to learn how to make it
All important files are commented and documented. Check these files out in the following order:

1. db/sequelize.js

2. config/sequelize.js

3. models/item.js

4. controller/items.js

5. routes/api.js

6. .sequelizerc

7. db/migrations/202107201234-create-items.js

8. app.js

9. \_\_tests\_\_/api.test.js
