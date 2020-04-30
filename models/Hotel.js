const mongoose = require('mongoose')

/**
* Hotel Schema
*/
const HotelSchema = new mongoose.Schema({
    NomH: {
        type: String,
        required: true
    },
    CateH: {
        type: Number,
        required: true
    },
    AdrH: {
        type: String,
        required: true
    },
    TelH: {
        type: String,
        required: true
    },
    NbChDisp: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Hotel = mongoose.model('Hotel', HotelSchema, 'Hotel')

module.exports = Hotel