# Social-Network-API

## Description

- Social-Network-API using Express and MongoDB that enables us to:
  - GET a user and their thought, friends and reactions.
  - perform CRUD operation on a database

## Usage
- npm install: to install required packages.
- npm start: to start the server
- The following routes are avaiailable to interact with the API ( GET,POST,PUT,DELETE are availaible to perform CRUD operations)
    - GET POST PUT DELETE: /api/users
    - POST /api/users/:userId/friends/:friendId
    - GET /api/thoughts
    - POST /api/thoughts/:thoughtId/reactions
    - DELETE /api/thoughts/:thoughtId/reactions/:reactionId
- Video demonstration : 
## Credits
- developed by Ermiyas Bekele
- used MongoDB, node.js with express.js

# Licenses
- MIT License


