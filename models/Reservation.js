const mongoose = require('mongoose')

/**
* Reservation Schema
*/
const ReservationSchema = new mongoose.Schema({
    NumH: {
        type: String,
        required: true
    },
    NumCu: {
        type: String,
        required: true
    },
    DateDebRes: {
        type: String,
        required: true
    },
    DateFinRes: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Reservation = mongoose.model('Reservation', ReservationSchema, 'Reservation')

module.exports = Reservation