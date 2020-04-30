/**
* call library
*/
const express = require("express")
const router = express.Router()
const Client = require('../models/Client')
const { check, validationResult } = require('express-validator/check')
const clientController = require('../controllers/client.controller')
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
* route for all client
*/
router.get('/all/:page?',isAuthenticated, clientController.all_clients)

/**
* route for new client
*/
router.get('/new',isAuthenticated, clientController.render_client)

/**
* route for post client
*/
router.post('/new', [
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('contact').isLength({min: 3}).withMessage('contact should be more than 5 char'),
    check('email').isLength({min: 5}).withMessage('email should be more than 5 char'),
    ], clientController.new_client)

/**
* route for single client
*/
router.get('/single/:id',isAuthenticated, clientController.find_client_by_id)

/**
* route for edit client
*/
router.get('/edit/:id',isAuthenticated, clientController.edit_client_by_id)

/**
* route for update client
*/
router.post('/update',isAuthenticated,[
    check('firstname').isLength({min: 5}).withMessage('firstname should be more than 5 char'),
    check('lastname').isLength({min: 5}).withMessage('lastname should be more than 5 char'),
    check('contact').isLength({min: 3}).withMessage('contact should be more than 5 char'),
    check('email').isLength({min: 3}).withMessage('email should be more than 5 char'),
], clientController.update_client_by_id)

/**
* route for delete client
*/
router.post('/delete',isAuthenticated, clientController.delete_client_by_id)

module.exports = router