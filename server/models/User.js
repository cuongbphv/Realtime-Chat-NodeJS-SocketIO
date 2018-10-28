const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

mongoose.model('users',UserSchema);