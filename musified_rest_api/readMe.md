SEND MESSAGE TO ADMIN ENDPOINT

1. Send message ( via contact form in appliocation ): 
 - http://localhost:4000/msg/send

API CRUD OPERATIONS ENDPOINTS

1. Read all reconrds: GET
  - http://localhost:4000/api/records

2. Read existing record: GET
  - http://localhost:4000/api/records/:id

3. Create new record: POST
  - http://localhost:4000/api/records

4. Update existing record: PUT
  - http://localhost:4000/api/records/:id

5. Delete existing record: DELETE
  - http://localhost:4000/api/records/:id

USER CRUD OPERATIONS ENDPOINTS

1. Users / login
  - http://localhost:4000/users/login

2. Users / register
  - http://localhost:4000/users/register

3. Users / logout
  - http://localhost:4000/users/logout

  HANDLING ERRORS FROM CLIENT SIDE
 - Client must catch an error and look for the 'message' property in the error object