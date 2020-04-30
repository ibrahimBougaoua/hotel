/**
* call library
*/
const Reservation = require('../models/Reservation');
const Customer = require('../models/Customer')
const Hotel = require('../models/Hotel')
const { check, validationResult } = require('express-validator/check')

/**
* new reservation
*
* @param req
* @param res
*/
exports.new_reservation = function(req,res) {

    Customer.findOne({_id: req.body.clientID}, (err,customer)=> {
            
            if(!err) {

                let newReservation = new Reservation({
                    NumH: req.body.hotelID,
                    NumCu:req.body.customerID,
                    DateDebRes: req.body.DateBegin,
                    DateFinRes: req.body.DateEnd,
                    created_at: Date.now()
                })

                if( req.body.DateBegin != "" || req.body.DateEnd != "" ){

                    newReservation.save( (err)=> {
                        if(!err) {

                            Hotel.findOne({_id: req.body.hotelID}, (err,hotel)=> {
                                if(hotel)
                                {
                                    console.log(hotel.NbChDisp)
                                    let nbr = hotel.NbChDisp - 1
                                    Hotel.updateOne({_id: req.body.hotelID}, {NbChDisp: nbr}, (err)=> {
                                        if(err)
                                        {
                                            console.log(err)
                                        }
                                    })
                                }
                            })

                            req.flash('success', ' The reservation was created successfuly')
                            res.redirect('/reservation/all')
                        } else {
                            console.log(err)
                        } 
                    })
                } else {
                    req.flash('error', 'Date is empty')
                    res.redirect('/reservation/new')
                }

            } else {
                console.log(err)
            }
        
         })

}

/**
* get all data from database
*
* @param req
* @param res
*/
exports.all_reservation = function(req,res) {
    
    let page = 1
    if(req.params.page){
        page = parseInt(req.params.page)
    }
    if(req.params.page == 0) {
       page = 1
    }
    let q = {
        skip:5*(page-1),
        limit:5
    }
    let totalDocs = 0
    Reservation.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Reservation.find({},{},q, (err,reservation)=> {
        if(!err){
         res.render('reservation/index', {
            reservation : reservation,
            total : parseInt(totalDocs),
            page : page,
            title : "All reservation",
            success: req.flash('success')
         })
        } else {
            res.redirect('/reservation/new')
        }
    }).sort({created_at:'desc'}); 
})
}

/**
* get reservation
*
* @param req
* @param res
*/
exports.find_reservation_by_id = function(req,res) {
    Reservation.findOne({_id: req.params.id}, (err,reservation)=> {
        
        if(!err) {
            
         res.render('reservation/single', {
             reservation: reservation,
             title: "single reservation",
         })
 
        } else {
            console.log(err)
        }
     
     })
}

/**
* edit reservation
*
* @param req
* @param res
*/
exports.edit_reservation_by_id = function(req,res) {
    
    Reservation.findOne({_id: req.params.id}, (err,reservation)=> {
        if(!err) {
            Hotel.find({}, (err,hotel)=> {
              if(!err) {
                Customer.find({}, (err,customer)=> {
                  if(!err) {
                    res.render('reservation/edit', {
                        hotel: hotel,
                        customer: customer,
                        reservation: reservation,
                        title: "edit reservation",
                        errors: req.flash('errors'),
                        success: req.flash('success')
                    })
                  } else {
                      console.log(err)
                  }

                })
              }
            })
         }
    })
}

/**
* update reservation
*
* @param req
* @param res
*/
exports.update_reservation_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/reservation/edit/' + req.body.id)
    } else {

       let newfeilds = {
        NumH: req.body.hotelID,
        NumCu:req.body.customerID,
        DateDebRes: req.body.DateBegin,
        DateFinRes: req.body.DateEnd,
       }
       let query = {_id: req.body.id}

       Reservation.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The reservation was updated successfuly"),
               res.redirect('/reservation/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
   
}

/**
* render reservation
*
* @param req
* @param res
*/
exports.render_reservation = function(req,res) {
    
    Hotel.find({}, (err,hotel)=> {
    if(!err) {
    Customer.find({}, (err,customer)=> {
     if(!err) {
     res.render('reservation/new', {
         hotel: hotel,
         customer: customer,
         title:"New reservation",
         errors: req.flash('errors'),
         error: req.flash('error')
     })
    }
    })
    }
    })
}

/**
* delete reservation
*
* @param req
* @param res
*/
exports.delete_reservation_by_id = function(req,res) {

    let query = {_id: req.body.id}

    Reservation.findOne({_id: req.body.id}, (err,reservation)=> {
        if(reservation)
        {
            Hotel.findOne({_id: reservation.NumH}, (err,hotel)=> {
                if(hotel)
                {
                console.log(hotel.NbChDisp)
                let nbr = hotel.NbChDisp + 1
                Hotel.updateOne({_id: reservation.NumH}, {NbChDisp: nbr}, (err)=> {
                    if(err)
                    {
                    console.log(err)
                   }
                })
                }
            })
        }
    })

    Reservation.deleteOne(query, (err)=> {
        if(!err) {

            req.flash('success', " The reservation was deleted successfuly")
            res.redirect('/reservation/all')
        } else {
            req.flash('error', 'reservation delete error')
            res.redirect('/reservation/single/' + req.params.id)
        }
    })
    
}