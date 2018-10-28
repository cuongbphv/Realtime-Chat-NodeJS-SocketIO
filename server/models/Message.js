const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create User Schema
const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    typeMessge: {
        type: String,
        default: 'normal'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('messages', MessageSchema);