/**
* call library
*/
const express = require("express")
const router = express.Router()
const Reservation = require('../models/Reservation')
const { check, validationResult } = require('express-validator/check')
const reservationController = require('../controllers/reservation.controller')
const moment = require('moment');
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if ( req.isAuthenticated() ) return next()
    res.redirect('/users/login')
}

/**
* route for all reservation
*/
router.get('/all/:page?',isAuthenticated, reservationController.all_reservation)
  
// route for new reservation
/**
* middleware
*/
router.get('/new',isAuthenticated, reservationController.render_reservation)

// route for post reservation
/**
* middleware
*/
router.post('/new',isAuthenticated, reservationController.new_reservation)

/**
* route for single reservation
*/
router.get('/single/:id',isAuthenticated, reservationController.find_reservation_by_id)

/**
* route for edit reservation
*/
router.get('/edit/:id',isAuthenticated, reservationController.edit_reservation_by_id)

/**
* route for update reservation
*/
router.post('/update',isAuthenticated, reservationController.update_reservation_by_id)

/**
* route for delete reservation
*/
router.post('/delete',isAuthenticated, reservationController.delete_reservation_by_id)

module.exports = router