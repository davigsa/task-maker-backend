# Task Maker - Backend
## How to run
Make sure you have `yarn` installed. After that, run `yarn install`. Create an `.env` file in the root folder, following the `.env.example` file.
Then, run `yarn dev`, to run the backend project with nodemon.

## Details
This project uses node.js, sequelize and sqlite as database.

## Routes
```
GET
- /api/projects -> List all projects with your tasks from specific user
- /api/projects/:id -> List a specific project with your tasks

POST
- /api/projects -> Create a project
- /api/tasks -> Create task for a project
- /api/users -> Create user account
- /api/auth -> Authenticate user to login

PUT
- /api/tasks/:id -> Modify specific task
- /api/projects/:id -> Modify specific project

DELETE
- /api/tasks/:id -> Delete specific task
- /api/projects/:id -> Delete specific project
```

## How to test
After running the project, we need to test, so, there is a roadmap to test correctly.

1- Create an user
```
curl --request POST \
  --url http://localhost:3333/api/users \
  --header 'Content-Type: application/json' \
  --data '{
	"firstName": "George",
	"lastName": "Sanderson",
	"username": "sanderson",
	"password": "1234"
}'

{"id":"b2e6e78f-d366-421c-a872-282b5431e877","firstName":"George","lastName":"Sanderson","username":"sanderson","password":"$2b$08$GtOJiSS9H4A5tueiG.qz.OPpPM5Lkc4qBeI1Aq1gTX1DrmxIn.dEa","updatedAt":"2022-06-21T18:26:34.056Z","createdAt":"2022-06-21T18:26:34.056Z"}
```

2- Authenticate your user
```
curl --request POST \
  --url http://localhost:3333/api/auth \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "sanderson",
	"password": "1234"
}'

{"user":{"id":"b2e6e78f-d366-421c-a872-282b5431e877","firstName":"George","lastName":"Sanderson","username":"sanderson","password":"$2b$08$GtOJiSS9H4A5tueiG.qz.OPpPM5Lkc4qBeI1Aq1gTX1DrmxIn.dEa","createdAt":"2022-06-21T18:26:34.056Z","updatedAt":"2022-06-21T18:26:34.056Z"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyZTZlNzhmLWQzNjYtNDIxYy1hODcyLTI4MmI1NDMxZTg3NyIsImlhdCI6MTY1NTgzNjA1OSwiZXhwIjoxNjU1OTIyNDU5fQ.8J87HrELmUWm5vJb0WYxiJZ4MVrnVwbeqn_fQiz8Uu4"}
```

After this step, we will need this token to pass throw our `authMiddleware` to some some routes results, such as create routes.

3- Create a project
```
curl --request POST \
  --url http://localhost:3333/api/projects \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyZTZlNzhmLWQzNjYtNDIxYy1hODcyLTI4MmI1NDMxZTg3NyIsImlhdCI6MTY1NTgzNjA1OSwiZXhwIjoxNjU1OTIyNDU5fQ.8J87HrELmUWm5vJb0WYxiJZ4MVrnVwbeqn_fQiz8Uu4' \
  --header 'Content-Type: application/json' \
  --data '{
	"projectName": "Monster Inc",
	"userId": "b2e6e78f-d366-421c-a872-282b5431e877"
}'

{"id":"12e90551-f3a2-4117-9d1c-a0ef9f7c857b","projectName":"Monster Inc","userId":"b2e6e78f-d366-421c-a872-282b5431e877","updatedAt":"2022-06-21T18:31:11.300Z","createdAt":"2022-06-21T18:31:11.300Z"}
```

4- Finally, create a task
```
curl --request POST \
  --url http://localhost:3333/api/tasks \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyZTZlNzhmLWQzNjYtNDIxYy1hODcyLTI4MmI1NDMxZTg3NyIsImlhdCI6MTY1NTgzNjA1OSwiZXhwIjoxNjU1OTIyNDU5fQ.8J87HrELmUWm5vJb0WYxiJZ4MVrnVwbeqn_fQiz8Uu4' \
  --header 'Content-Type: application/json' \
  --data '{
	"description": "Wash dishes",
	"completed": false,
	"priority": "High",
	"projectId": "12e90551-f3a2-4117-9d1c-a0ef9f7c857b"
}'

{"id":"65156fd8-298f-41f1-a5e7-b75e6dbeb329","description":"Wash dishes","priority":"High","completed":false,"projectId":"12e90551-f3a2-4117-9d1c-a0ef9f7c857b","updatedAt":"2022-06-21T18:34:51.521Z","createdAt":"2022-06-21T18:34:51.521Z"}
```
