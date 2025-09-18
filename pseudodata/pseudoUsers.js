const users = [
  {
    "username": "Alice",
    "email": "alice@yahoo.com",
    "password": "alicepass",
    "role": "admin"
  },
  {
    "username": "Bulma",
    "email": "bulma@yahoo.com",
    "password": "bulmapass",
    "role": "sub"
  },
  {
    "username": "Charlie",
    "email": "charlie@yahoo.com",
    "password": "charliepass",
    "role": "user"
  },
  {
    "username": "Danica",
    "email": "danica@yahoo.com",
    "password": "danicapass",
    "role": "user"
  }
]

/**
http://localhost:3001/login

For POST admin/ools - JWT test OK.  (In Postman, Authorization tab, "Type": Bearer Token, pasting incorrect token results in error.  Correct token does not get error.)

{
  username: 'Alice',
  email: 'alice@yahoo.com',
  password: '$2b$10$whkgdB6V8H7Uf5o.en.SNutt7Q37OrTpUkVi..dzUn/Zp3npL8tAS',
  role: 'admin',
  _id: new ObjectId('68cc35a78ea08f2c101d5069'),
  __v: 0
}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY4Y2MzNWE3OGVhMDhmMmMxMDFkNTA2OSIsInVzZXJuYW1lIjoiQWxpY2UiLCJlbWFpbCI6ImFsaWNlQHlhaG9vLmNvbSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3NTgyMTg2NjIsImV4cCI6MTc1ODIyMjI2Mn0.uRjRLsEnh5cx6ih_-n80bU4A2gET-9EBVUIXc0AFbfc",
    "user": {
        "username": "Alice",
        "email": "alice@yahoo.com",
        "role": "admin"
    }
}
{
  username: 'Bulma',
  email: 'bulma@yahoo.com',
  password: '$2b$10$Ewj5J2X8Cny1f4MINxyaUuA3Yj2C8u.kNid6bJNu6lekm9n.cw/Ju',
  role: 'sub',
  _id: new ObjectId('68cc4ed57d45bd6823526749'),
  __v: 0
}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY4Y2M0ZWQ1N2Q0NWJkNjgyMzUyNjc0OSIsInVzZXJuYW1lIjoiQnVsbWEiLCJlbWFpbCI6ImJ1bG1hQHlhaG9vLmNvbSIsInJvbGUiOiJzdWIifSwiaWF0IjoxNzU4MjIwMDE3LCJleHAiOjE3NTgyMjM2MTd9.bdEN2I_zHeYh3SwRjCGQ4WyTEYKWG9gQLN_e69QFO98",
    "user": {
        "username": "Bulma",
        "email": "bulma@yahoo.com",
        "role": "sub"
    }
}
{
  username: 'Charlie',
  email: 'charlie@yahoo.com',
  password: '$2b$10$MkCEuX..dwn6bNbSBSk1..IEPtGdEyOuLrj9qbGQbRI5oOvg07kGC',
  role: 'user',
  _id: new ObjectId('68cc35f78ea08f2c101d506f'),
  __v: 0
}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY4Y2MzNWY3OGVhMDhmMmMxMDFkNTA2ZiIsInVzZXJuYW1lIjoiQ2hhcmxpZSIsImVtYWlsIjoiY2hhcmxpZUB5YWhvby5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NTgyMTM4MDQsImV4cCI6MTc1ODIxNzQwNH0.boTnQKxKaJZ3HgAOfC9CgRakSS6auWMxlDnQvSOo9mo",
    "user": {
        "username": "Charlie",
        "email": "charlie@yahoo.com",
        "role": "user"
    }
}
{
  username: 'Danica',
  email: 'danica@yahoo.com',
  password: '$2b$10$WbmuxPC5yUQD8bJ575ftzO50E7dq8hCXZB/kv/TW.msH8ANCt7Ufi',
  role: 'user',
  _id: new ObjectId('68cc3ce408ea92ac04c85d62'),
  __v: 0
}

 */

const ool = [
  {
    "commonName": {
      "en": "Strongest"
    },
    "description": {
      "en": "Takes strongest defenders last"
    },
    "ool": "biatf"
  },
  {
    "commonName": {
      "en": "Economic"
    },
    "description": {
      "en": "Takes most expensive defenders last"
    },
    "ool": "iatfb"
  },
  {
    "commonName": {
      "en": "Test"
    },
    "description": {
      "en": "For Testing Purposes"
    },
    "ool": "tabif"
  }
]
/**
{
  commonName: { en: 'Strongest' },
  description: { en: 'Takes strongest defenders last' },
  ool: 'biatf',
  _id: new ObjectId('68cc3a5b8ea08f2c101d5079'),
  __v: 0
}
{
  commonName: { en: 'Economic' },
  description: { en: 'Takes most expensive defenders last' },
  ool: 'iatfb',
  _id: new ObjectId('68cc3a7b8ea08f2c101d507b'),
  __v: 0
}
{
  commonName: { en: 'Test' },
  description: { en: 'For Testing Purposes' },
  ool: 'tabif',
  _id: new ObjectId('68cc3faa08ea92ac04c85d6c'),
  __v: 0
}
 */

const userLinks = [
  // Charlie, Strongest
  {
    "user": "68cc35f78ea08f2c101d506f", 
    "ool": "68cc3a5b8ea08f2c101d5079",
    "nickname": "Charlie's Ultimate Defense"
  },
  // Charlie, Econ
  {
    "user": "68cc35f78ea08f2c101d506f",
    "ool": "68cc3a7b8ea08f2c101d507b",
    "nickname": "Charlie's Ultimate Economy"
  },
  // self, econ was it?, no name
  {
    "user": "68cc35a78ea08f2c101d5069",
    "ool": "68cc3faa08ea92ac04c85d6c",
    "nickname": ""
  },
]
/**
{
  user: new ObjectId('68cc35f78ea08f2c101d506f'),
  ool: new ObjectId('68cc3a5b8ea08f2c101d5079'),
  nickname: "Charlie's Ultimate Defense",
  _id: new ObjectId('68cc4bc17d45bd6823526734'),
  __v: 0
}
{
  user: new ObjectId('68cc35f78ea08f2c101d506f'),
  ool: new ObjectId('68cc3a7b8ea08f2c101d507b'),
  nickname: "Charlie's Ultimate Economy",
  _id: new ObjectId('68cc4bf67d45bd6823526736'),
  __v: 0
}
{
        "user": "68cc35a78ea08f2c101d5069",
        "ool": "68cc3faa08ea92ac04c85d6c",
        "nickname": "",
        "_id": "68cc4ca87d45bd682352673e",
        "__v": 0
    }

// Bulma

{
        "user": "68cc4ed57d45bd6823526749",
        "ool": "68cc3faa08ea92ac04c85d6c",
        "nickname": "Bulma Test",
        "_id": "68cc55706c6bc1f3386a6fe0",
        "__v": 0
    }
{
        "user": "68cc4ed57d45bd6823526749",
        "ool": "68cc3a7b8ea08f2c101d507b",
        "nickname": "Bulma Econ",
        "_id": "68cc55936c6bc1f3386a6fe2",
        "__v": 0
    }
{
        "user": "68cc4ed57d45bd6823526749",
        "ool": "68cc3a5b8ea08f2c101d5079",
        "nickname": "Bulma Defense",
        "_id": "68cc55ac6c6bc1f3386a6fe4",
        "__v": 0
    }



 */


// const userLinkSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     //https://mongoosejs.com/docs/schematypes.html#objectids
//     // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
//     ref: 'User',
//     required: true,
//   },
//   ool: {
//     type: Schema.Types.ObjectId,
//     //https://mongoosejs.com/docs/schematypes.html#objectids
//     // for user's ObjectId - explicitly, ._id, the unique ID assigned by MongoDB.
//     ref: 'Ool',
//     required: true,
//   },
//   nickname: {
//     type: String, // we would want the default to be the OOL's common name depending on the user's language setting.
//   }

// });



// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: [true, 'Please enter a username.'],
//     unique: [true, 'This username has already been taken.'],
//     trim: true,
//   },
//   email: { // the user may have one of password or githubId, or both.  email links the two, though username is also unique - so ordered by instructions in SBA (skills based assessment).
//     type: String,
//     required: [true, 'Please enter an email'],
//     unique: [true, 'This email already exists.'],
//     match: [/.+@.+\..+/, 'Must use a valid email address'],
//   },
//   // createdAt: {
//   //   type: Date,
//   //   default: Date.now,
//   // },
//   password: {
//     type: String,
//     required: [true, 'Please enter a password'],
//     minlength: 5,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'sub', 'admin'],
//     default: 'user'
//   },
//   // githubId: {
//   //   type: String,
//   //   unique: true,
//   //   minlength: 1, // presumably github requires at least one character
//   // },
//   //   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   // githubId: { type: String, unique: true }
// });

// const oolSchema = new Schema({
//   commonName: {
//     type: Object,
//     of: String
//   },
//   description: {
//     type: Object,
//     of: String
//   },
//   ool: {
//     type: String,
//     required: [true, 'Please enter an Order Of Loss'], // note validation should occur locally and server side.  Implement with 'ruleset'.  
//   }
// });
