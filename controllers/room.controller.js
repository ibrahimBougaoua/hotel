/**
* call library
*/
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const {validationResult,check} = require('express-validator/check')

/**
* new room
*
* @param req
* @param res
*/
exports.new_room = function(req,res) {

    const errors = validationResult(req)

    if( !errors.isEmpty()) {
        
        req.flash('errors',errors.array())
        res.redirect('/room/new')
    } else {

        if(req.body.hotel != ''){
        
        let newRoom = new Room({
            NumH: req.body.hotel,
            NumberPlace: req.body.numberplace,
            CatCh: req.body.CatCh,
            Disponible: req.body.disponible,
            Description : req.body.description,
            created_at: Date.now(),
        })

        newRoom.save( (err)=> {
            if(!err) {
                req.flash('success', ' The room was created successfuly')
                res.redirect('/room/all')
            } else {
                console.log(err)
            } 
        })
    } else {
        req.flash('error','The hotel fiels is empty !')
        res.redirect('/room/new')
    }

    }
} 

/**
* get all data from database
*
* @param req
* @param res
*/
exports.all_room = function(req,res) {

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
    Room.countDocuments({},(err,total)=>{

    }).then((response)=>{
        totalDocs = parseInt(response)  

    Room.find({},{},q,(err,room)=> {
        if(!err){
         res.render('room/index', {
            room : room,
             total : parseInt(totalDocs),
             page : page,
             title : "All room",
             success: req.flash('success')
         })
        } else {
            res.redirect('/room/new')
        }
    }).sort({created_at:'desc'}); 
})

}

/**
* get room
*
* @param req
* @param res
*/
exports.find_room_by_id = function(req,res) {

    Room.findOne({_id: req.params.id}, (err,room)=> {
        
        if(!err) {

Hotel.findOne({_id: room.NumH}, (err,hotel)=> {

      if(!err){

             res.render('room/single', {
             room: room,
             hotel: hotel,
             title: "single room"
         })
 }
})
        } else {
            console.log(err)
        }
     
     })
  

} 

/**
* edit room
*
* @param string req
* @param string res
*/
exports.edit_room_by_id = function(req,res) {

    let number_place = [1,2,3,4,5,6,7,8,9,10]

    Hotel.find({},(err,hotel)=> {
      if(!err){

    Room.findOne({_id: req.params.id}, (err,room)=> {
        
        if(!err) {
       
         res.render('room/edit', {
             number_place: number_place,
             hotel: hotel,
             room: room,
             title: "edit room",
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

/**
* update room
*
* @param req
* @param res
*/
exports.update_room_by_id = function(req,res) {

    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/room/edit/' + req.body.id)
    } else {
        
       let newfeilds = {
            NumH: req.body.hotel,
            NumberPlace: req.body.numberplace,
            CatCh: req.body.CatCh,
            Disponible: req.body.disponible,
            Description : req.body.description,
       }
       let query = {_id: req.body.id}

       Room.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('success', " The room was updated successfuly"),
               res.redirect('/room/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }

} 

/**
* render room
*
* @param req
* @param res
*/
exports.render_room = function(req,res) {
    let number_place = [1,2,3,4,5,6,7,8,9,10]
    Hotel.find({},(err,hotel)=> {
      if(!err){
        res.render('room/new', {
            hotel:hotel,
            number_place:number_place,
            title:"new room",
            errors: req.flash('errors')
        })
      }
    })
} 

/**
* delete room by id
*
* @param req
* @param res
*/
exports.delete_room_by_id = function(req,res) {

let query = {_id: req.body.id}

Room.deleteOne(query, (err)=> {
    if(!err) {
        req.flash('success', " The room was deleted successfuly")
        res.redirect('/room/all')
    } else {
        req.flash('error', 'room delete error')
        res.redirect('/room/single/' + req.params.id)
    }
})

}