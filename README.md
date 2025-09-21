## D

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

### Models

const oolSchema = new Schema({
  commonName: {
    type: Object,
    of: String
  },
  description: {
    type: Object,
    of: String
  },
  ool: {
    type: String,
    required: [true, 'Please enter an Order Of Loss'], // note validation should occur locally and server side.  Implement with 'ruleset'.  
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username.'],
    unique: [true, 'This username has already been taken.'],
    trim: true,
  },
  email: { // the user may have one of password or githubId, or both.  email links the two, though username is also unique - so ordered by instructions in SBA (skills based assessment).
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, 'This email already exists.'],
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ['user', 'sub', 'admin'],
    default: 'user'
  }
});

const userLinkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
    ref: 'User',
    required: true,
  },
  ool: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
    ref: 'Ool',
    required: true,
  },
  nickname: {
    type: String, // we would want the default to be the OOL's common name depending on the user's language setting.
  }

});