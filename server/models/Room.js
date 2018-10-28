const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create User Schema
const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    }
});

mongoose.model('rooms',RoomSchema);