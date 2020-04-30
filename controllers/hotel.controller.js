/**
* call library
*/
const Hotel = require('../models/Hotel')
const {validationResult,check} = require('express-validator/check')

/**
* new hotel
*
* @param req
* @param res
*/
exports.new_hotel = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/hotel/new')
    } else {
        
        let newHotel = new Hotel({
            NomH: req.body.nom,
            CateH: req.body.cateH,
            AdrH: req.body.adr,
            TelH : req.body.tel,
            NbChDisp : req.body.nbchdisp,
            created_at: Date.now(),
        })

        newHotel.save( (err)=> {
            if(!err) {
                req.flash('success', ' The hotel was created successfuly')
                res.redirect('/hotel/all')
            } else {
                console.log(err)
            } 
        })
    }
}

/**
* get all data from database
*
* @param req
* @param res
*/
exports.all_hotel = function(req,res) {

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
    Hotel.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

        Hotel.find({},{},q, (err,hotel)=> {
        if(!err){
         res.render('hotel/index', {
            hotel : hotel,
            total : parseInt(totalDocs),
            page : page,
            title : "All hotel",
            success: req.flash('success')
         })
        } else {
            res.redirect('/hotel/new')
        }
    }).sort({created_at:'desc'}); 
})
  
}

/**
* get hotel
*
* @param req
* @param res
*/
exports.find_hotel_by_id = function(req,res) {

    Hotel.findOne({_id: req.params.id}, (err,hotel)=> {
        
        if(!err) {
            
         res.render('hotel/single', {
             hotel: hotel,
             title: "single hotel"
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* edit hotel
*
* @param req
* @param res
*/
exports.edit_hotel_by_id = function(req,res) {
    
    Hotel.findOne({_id: req.params.id}, (err,hotel)=> {
        
        if(!err) {
       
         res.render('hotel/edit', {
             hotel: hotel,
             title: "edit hotel",
             errors: req.flash('errors'),
             success: req.flash('success')
         })
 
        } else {
            console.log(err)
        }
     
     })

}

/**
* update hotel
*
* @param req
* @param res
*/
exports.update_hotel_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/hotel/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
            NomH: req.body.nom,
            CateH: req.body.cateH,
            AdrH: req.body.adr,
            TelH : req.body.tel,
            NbChDisp : req.body.nbchdisp,
       }
       let query = {_id: req.body.id}

       Hotel.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The hotel was updated successfuly"),
               res.redirect('/hotel/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
}

/**
* render hotel
*
* @param req
* @param res
*/
exports.render_hotel = function(req,res) {
    res.render('hotel/new', {
        errors: req.flash('errors'),
        title: "new hotel"
    })
}

/**
* delete hotel
*
* @param req
* @param res
*/
exports.delete_hotel_by_id = function(req,res) {

    let query = {_id: req.body.id}
    
    Hotel.deleteOne(query, (err)=> {
        if(!err) {
            req.flash('success', " The hotel was deleted successfuly")
            res.redirect('/hotel/all')
        } else {
            req.flash('error', 'hotel delete error')
            res.redirect('/hotel/single/' + req.params.id)
        }
    })
    
}