const { date } = require('joi');
const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const AuthorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },

    dob: {
        type: Date,
    },
    country: {
        type: String,
        required: false, //validation with custom message
    },
    books: {
        type: Array,
        default: []
    }
});

// Export the model
module.exports = moogoose.model('authors', AuthorSchema); //collection name is Books. This is the name of the collection in the database