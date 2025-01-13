# API Documentation

## User Routes

### get current user

Gets current users information

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/users/:userId
  - Body:

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
      -Body:{
        userName
        firstName
        lastName
        email
        Id}

- Successful Response when there is no logged in user

  - Headers:
    - Content-Type: application/json
  - Status Code: 200
    body: {user: null}

- Error Response
  - Headers:
    - Content-Type: application/json
      status code: 500
      body: {msg: user not found}

### Update user

updates users info

- Require Authentication: true
- Request

  - Method: PATCH
  - Route path: /api/users/:userId
  - Body:{
  - username
  -  firstName
  -  lastName
  -  email}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Delete user

deletes users profile

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/users/:userId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "user deleted"}

## Session Routes

### Login a user

Creates user session

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/auth/login
  - Body:{
      credential,
      Password}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Logout a user

Ends a users session

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/auth/logout

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Signup

Creates a new user in the DB, and returns current users info, logs them in

- Require Authentication: false
- Request

  - Method: POST
  - Route path: /api/auth/signup
  - Body:{
    username,
    firstName,
    lastName,
    email,
    password,}

- Successful Response
  - Status Code: 201
  - Headers:
    - Content-Type: application/json

## User_Events Routes

### Get all Events 

gets the current users events

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/events/
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Get all Events for current user

gets the current users events

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/events/user_events
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json

### Post an event to a user

adds event to users event list
many to many relationship between user.id and user_events.user_id
many to many relationship between events.id and user_events.event_id

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/events/:eventId
  - Body:{
    event_Id,
    user_id,
    guests,}


- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "Event added succesfully"}

### Update event 

edits number of guests attending event

- Require Authentication: true
- Request

  - Method: PATCH
  - Route path: /api/events/:eventId
  - Body:{
    guests}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {
    event_Id,
    user_id,
    guests,
    createdAt,
    updatedAt,
  }

### Delete Event

deletes event for the user

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/events/:eventId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "event deleted"}

## Court Reservations Routes

### Get all reservations for current user

gets the current users court reservations

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/reservations/user_reservations
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:{
    id
    userId
    date
    start_time
    end_time
    court_number
    players
    createdAt
    updatedAt}

### Post reservation 

creates a court reservation for the user
many to many relationship between user.id and user_events.user_id
many to many relationship between events.id and user_events.event_id

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/reservations/:eventId
  - Body:{
    date
    start_time
    end_time
    court_number
    players}


- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {
    id
    userId
    date
    start_time
    end_time
    court_number
    players
    createdAt
    updatedAt}
  
### Update reservation 

changes date, start time, end time, number of players
end_time is calculated to be start_time + duration of playtime is (not input by user!!!)
court number is also calculated through code (not input by user!!!)

- Require Authentication: true
- Request

  - Method: PATCH
  - Route path: /api/reservations/:reservationId
  - Body:{
    date
    start_time
    end_time
    court_number
    players}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {
    id
    userId
    date
    start_time
    end_time
    court_number
    players
    createdAt
    updatedAt
  }

### Delete Reservation

deletes reservation for user, allows other users to reserve that time slot

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/reservations/:reservationId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "reservation deleted"}

## Photo routes

### Get all photos

Shows all photos posted to the site, only available when signed in

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/photos
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

### Get photo by username

Searches all photos that belong to a specified username

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/photos/search
  - Body:
    username


- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

### Get photo by Id

Shows one specific photo

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/photos/:photoId
  - Body:


- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

### Post a photo 

adds a users uploaded photo to the site

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/photos
  - Body:{
    user_id
    photo_url}


- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "Photo added succesfully"}

### Delete Photo

deletes reservation for user, allows other users to reserve that time slot

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/reservations/:reservationId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "photo deleted"}

## Comments routes

### Get all comments for a photo

Shows all comments for a specific photo

- Require Authentication: true
- Request

  - Method: GET
  - Route path: /api/comments/:photoId
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:{
    id 
    user_id
    photo_id
    comment
    createdAt
    updatedAt}

### Post a comment

adds a users uploaded photo to the site

- Require Authentication: true
- Request

  - Method: POST
  - Route path: /api/comments
  - Body:{
    user_id
    photo_url}


- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "comment added succesfully"}

### Update comment 

allows user to change the text of their comment after it is posted

- Require Authentication: true
- Request

  - Method: PATCH
  - Route path: /api/comments
  - Body:{
    comment}

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {
    id 
    user_id
    photo_id
    comment
    createdAt
    updatedAt
  }

### Delete comment

deletes comment

- Require Authentication: true
- Request

  - Method: DELETE
  - Route path: /api/comments
  - Body:

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body: {msg: "comment deleted"}