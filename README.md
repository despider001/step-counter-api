# Step Counter API
This API lets users 
 - Manage Team
    - Create team
    - Get all teams
    - Get a single team
 - Manage Member
    - Create member
    - Get all members
    - Get a single member
    - Increase step count of a member

## Environment
Node.js (version >=14.0.0) should be installed

## Installation
```npm run build``` <br>
```npm start```
    
*The app will run on 3000. In case, the port is already taken, it would not start off*

## Run Test
```npm run test``` <br>

*`jest` and `supertest` is used to unit test and API test. Code coverage is generated under /coverage directory*

## API Docs
Once the app starts running, API docs could be found at `http://localhost:3000/api/docs`

## *TODOs*

* ### **`Team` Model:**
Here is how my `Team` model looks like. 
```
type TeamProps = {
    id: number
    name: string
    steps: number
}
```
Instead of calculating each team's steps, we are saving the data into the team. 

But this is not a good practice, if you think about scalling. What if we want to remove a member? We will have to deduce the number from the team.



* ### **API Structure:**
There could be a different approach to design the API, which is as follows

`/teams` [GET]  - Gets all the members<br/>
`/teams` [POST] - Creates a new member<br/>
`/teams/:id` [GET] - Gets a team details<br/>
`/teams/:id/members` [GET] - Gets all the members of a team<br/>
`/teams/:id/members` [POST] - Creates a member<br/>
`/teams/:id/members/:memId` [GET] - Get a member details<br/>
`/teams/:id/members/:memId/step-up` [PATCH] - Increase the step count<br/>

But in this API, to retrieve a member, you need to know the teams id too. 

* ### **Comment thoroughly**
Comments are missing in the code

* ### **WImplement logging**
Logging is not implemented

* ### **Proper error handling**
Error has to be handled centrally and properly, which is completely missing

* ### **Better Unit test**
For each function, there has to many test cases that has to tested. Couldn't implement a proper testing

* ### **Test API properly**
All different requests has to be tested, which is kind of missing

* ### **Request body validation**
Anything that is coming from outside has to validated and different status code has to returned as required. Validation has to handled away from the main code block.

* ### **docker-compose**
And finally would place a docker-compose file, so that we could easily spip-up the app.


### Author
Sadiqur Rahman
