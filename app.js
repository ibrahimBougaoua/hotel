const db = require('./config/database')
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

// port for this server
port = 3000

// call ejs template
app.set('view engine', 'ejs')

// call body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// call static dir
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('node_modules'))

// configuration for Session.
app.use(session({
    secret: 'A21E14d4_g1fdz55415_6ZRT41641ZE_561erf1e_2g1fg1fg0_e',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 20}
}))

// configuration for flash.
app.use(flash())

// call passport 
app.use(passport.initialize())
app.use(passport.session())

// Save User Object, using for all application
app.get('*', (req,res,next)=> {
    res.locals.user = req.user || null
    next()
})

// this route for Home Page
app.get('/', (req,res)=> {
   res.render('index',{title:"Home Page"})
})

// this config for dashboard route
const dashboard = require('./routes/dashboard.routes')
app.use('/dashboard', dashboard)

// this config for customer route
const customer = require('./routes/customer.routes')
app.use('/customer', customer)

// this config for hotel route
const hotel = require('./routes/hotel.routes')
app.use('/hotel', hotel)

// this config for room route
const room = require('./routes/room.routes')
app.use('/room', room)

// this config for reservation route
const reservation = require('./routes/reservation.routes')
app.use('/reservation', reservation)

// this config for chef user route
const users = require('./routes/user.routes')
app.use('/users', users)

//The 404 route page
app.get('*', function(req, res){
    res.status(404).redirect('/');
});

// listen to port 3000
app.listen(port, ()=> {
    console.log('this application is wokring on port 3000')
})