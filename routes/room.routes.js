/**
* call library
*/
const express = require("express")
const router = express.Router()
const Room = require('../models/Room')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
const roomController = require('../controllers/room.controller')
moment().format();

/**
* middleware
*/
isAuthenticated = (req,res,next) => {
    if ( req.isAuthenticated() ) return next()
    res.redirect('/users/login')
}

/**
* route for all room
*/
router.get('/all/:page?',isAuthenticated, roomController.all_room)

/**
* route for new room
*/
router.get('/new',isAuthenticated, roomController.render_room)

/**
* route for post room
*/
router.post('/new',isAuthenticated, [
    check('description').isLength({min: 5}).withMessage('description should be more than 5 char'),
] , roomController.new_room)

/**
* route for single room
*/
router.get('/single/:id',isAuthenticated, roomController.find_room_by_id)

/**
* route for edit room
*/
router.get('/edit/:id',isAuthenticated, roomController.edit_room_by_id)

/**
* route for update room
*/
router.post('/update',isAuthenticated,[
    check('description').isLength({min: 5}).withMessage('description should be more than 5 char'),
], roomController.update_room_by_id)

/**
* route for delete room
*/
router.post('/delete',isAuthenticated, roomController.delete_room_by_id)

module.exports = router