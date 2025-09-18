const { Schema, model } = require('mongoose');
// const User = require('./User');
/**
 * HERE it is only id, text object of languages, containing value of another object with 'commonName' and 'description' keys.
 * 
 * NOTE:  We don't really like this as it's additional info.  Switch this either to local or to GraphQL.
 * 
 * const newOol = new OolSchema ({
 *   commonName: {
 *     en: 'Prioritize IPCs', // or 'Prioritize Fighting Value'
 *     es: 'Spanish Version'
 *   }
 * })
 */

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

const Ool = model('Ool', oolSchema);

module.exports = Ool;