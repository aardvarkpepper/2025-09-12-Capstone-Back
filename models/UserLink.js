const { Schema, model } = require('mongoose');
// const User = require('./User');
/**
 * 
HERE it is id, user_id, ool_id, nickname
 */

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

const UserLink = model('UserLink', userLinkSchema);

module.exports = UserLink;