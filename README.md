## Data for Service 

## Setup

After getting all files locally, in terminal 'npm install' to install dependencies.

Create an /env file with, substituting your own values for ...

MONGO_URI=mongodb....
PORT=...
JWT_SECRET=...

In terminal, 'node server.js' to start server.

## Paths

| Operation | Path | Function |
| --- | --- |---|
| POST | /register | Registers user |
| POST | /login | Logs user in |

### Must be logged in as admin to use following:

| Operation | Path | Function |
| --- | --- |---|
| GET | /admin/users | Lists all users |
| PUT | /admin/users/:id | Edits a specific user's info |
| DELETE | /admin/users/:id | Deletes a specific user |
| GET | /admin/ools | Lists all Order Of Losses |
| POST | /admin/ools | Create a new Order of Loss |
| PUT | /admin/ools/:id | Edit a specific Order Of Loss |
| DELETE | /admin/ools/:id | Delete a specific Order of Loss |
| GET | /admin/userlinks | Lists all userlinks |
| PUT | /admin/userlinks/:id | Edits a specific userlink |
| DELETE | /admin/userlinks/:id | Deletes a specific userlink

### Must be logged in as sub to use following:

| Operation | Path | Function |
| --- | --- |---|
| PUT | /subs/users/:id | Edit your user profile |
| DELETE | /subs/users/:id | Delete your user profile (yes, really) |
| GET | /subs/ools | Get your Order Of Losses |
| POST | /subs/ools | Create an Order of Loss |