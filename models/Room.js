const mongoose = require('mongoose')

/**
* room Schema
*/
const RoomSchema = new mongoose.Schema({
    NumH: {
        type: String,
        required: true
    },
    NumberPlace: {
        type: String,
        required: true
    },
    CatCh: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Disponible: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Room = mongoose.model('Room', RoomSchema, 'Room')

module.exports = Room