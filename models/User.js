const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

/**
* User Schema
*/
const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    LName: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'editor'
    },
    created_at: {
        type: Date,
        required: true
    },
    
})

/**
* hash password
*/
userSchema.methods.hashSyncPass = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

/**
* compare password
*/
userSchema.methods.compareSyncPass = (password, hash) => {
    return bcrypt.compareSync(password,hash)
}

/**
* check if admin
*/
userSchema.methods.isAdmin = function() {
    return (this.role == 'adminstrator')
}

/**
* check if user
*/
userSchema.methods.isUser = function() {
    return (this.role == 'user')
}

let User = mongoose.model('User', userSchema, 'User')

module.exports = User