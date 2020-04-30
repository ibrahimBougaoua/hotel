const db = require('../config/database')
const User = require('../models/User')
const Customer = require('../models/Customer')
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const Reservation = require('../models/Reservation')

// Users Seeder
let users = [
    new User({
        _id : ("5e946cbe64937321dc961e5e"),
        role : "adminstrator",
        Fname : "ibrahim",
        LName : "bougaoua",
        Contact : "02152145454",
        email : "adminstrator@gmail.com",
        password : "$2a$08$kmk4DRv5jcCRhNKk0OTBhuze6zKitBOSoSoFKQ/qVKinoVbXzVXkm",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:44:30.521Z")
    }),
]

// Customer Seeder
let customer = [
    new Customer({
        _id : ("5ea73c8ce07d3834300f810f"),
        Fname : "ibrahim",
        LName : "bougaoua",
        Contact : "02152145454",
        Email : "ibrahim@gmail.com",
        created_at : ("2020-04-27T20:11:56.035Z"),
    }),
]

// Hotel Seeder
let hotel = [
    new Hotel({
        _id : ("5ea73cb7e07d3834300f8110"),
        NomH : "darkness mode",
        CateH : 1,
        AdrH : "El Bilage fe ramdan",
        TelH : "0522124555",
        NbChDisp : 1499,
        created_at : ("2020-04-27T20:12:39.507Z"),
    }),
]

// Room Seeder
let room = [
    new Room({
        _id : ("5ea73ccee07d3834300f8111"),
        NumH : "5ea73cb7e07d3834300f8110",
        NumberPlace : "1",
        CatCh : "family",
        Disponible : "yes",
        Description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        created_at : ("2020-04-27T20:13:02.174Z"),
    }),
]

// Reservation Seeder
let reservation = [
    new Reservation({
        _id : ("5ea73cdce07d3834300f8112"),
        NumH : "5ea73cb7e07d3834300f8110",
        NumCu : "5ea73c8ce07d3834300f810f",
        DateDebRes : "2020-04-01",
        DateFinRes : "2020-04-02",
        created_at : ("2020-04-27T20:13:16.692Z"),
    }),
]

// excute loop all objects
users.forEach( (users)=> {
    users.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
customer.forEach( (customer)=> {
    customer.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
hotel.forEach( (hotel)=> {
    hotel.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
room.forEach( (room)=> {
    room.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
reservation.forEach( (reservation)=> {
    reservation.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})