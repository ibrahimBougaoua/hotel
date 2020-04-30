/**
* call library
*/
const Customer = require('../models/Customer')
const User = require('../models/User')
const Room = require('../models/Room')
const Hotel = require('../models/Hotel')
const Reservation = require('../models/Reservation')

/**
* count total documents for each Doc
*
* @param req
* @param res
*/
exports.render_dashboard_count = function(req,res) {
    User.countDocuments({},(err,userTotal)=>{
        Hotel.countDocuments({},(err,hotelTotal)=>{
            Customer.countDocuments({},(err,customerTotal)=>{
                Room.countDocuments({},(err,roomTotal)=>{
                    Reservation.countDocuments({},(err,reservationTotal)=>{
                        res.render('dashboard/dashboard', {
                            userTotal : userTotal,
                            hotelTotal : hotelTotal,
                            customerTotal : customerTotal,
                            roomTotal : roomTotal,
                            reservationTotal : reservationTotal,
                            title : "Dashboard",
                            success: req.flash('success')
                        })
                    })
                })
            })
        })
    })
}