/**
* call library
*/
const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const hotelController = require('../controllers/hotel.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if ( req.isAuthenticated() ) return next()
    res.redirect('/users/login')
}

/**
* route for all hotel
*/
router.get('/all/:page?',isAuthenticated, hotelController.all_hotel)

/**
* route for new hotel
*/
router.get('/new',isAuthenticated, hotelController.render_hotel)

/**
* route for post hotel
*/
router.post('/new',isAuthenticated, [
    check('nom').isLength({min: 5}).withMessage('nom should be more than 5 char'),
    check('adr').isLength({min: 5}).withMessage('adress should be more than 5 char'),
    check('tel').isLength({min: 10}).withMessage('telephone should be more than 10 char'),
] , hotelController.new_hotel)

/**
* route for single hotel
*/
router.get('/single/:id',isAuthenticated, hotelController.find_hotel_by_id)

/**
* route for edit hotel
*/
router.get('/edit/:id',isAuthenticated, hotelController.edit_hotel_by_id)

/**
* route for update hotel
*/
router.post('/update',isAuthenticated,[
    check('nom').isLength({min: 5}).withMessage('nom should be more than 5 char'),
    check('adr').isLength({min: 5}).withMessage('adress should be more than 5 char'),
    check('tel').isLength({min: 10}).withMessage('telephone should be more than 10 char'),
], hotelController.update_hotel_by_id)

/**
* route for delete hotel
*/
router.post('/delete',isAuthenticated, hotelController.delete_hotel_by_id)

module.exports = router