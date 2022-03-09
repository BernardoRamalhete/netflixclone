const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema ({
    firstname: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastname: { 
        type: String, 
        required: [true, 'Please add a last name']
    }, 
    email: { 
        type: String, 
        required: [true, 'Please add a email'],
        unique: true
    }, 
    password: { 
        type: String, 
        required: [true, 'Please add a password']
    },
    profiles: [{picture: String, name: String}]
},
{
    timestamps: true
})

module.exports = mongoose.model('User', user)
