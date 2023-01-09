const mongoose = require('mongoose')
const Joi = require('joi')
const jwt= require('jsonwebtoken')

const schema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50, 
        minlength: 2,
    },
    password:{
        type: String,
        required: true,
        maxlength: 1024, 
        minlength: 5,
        unique: true
    },
    email:{
        type: String,
        required: true,
        maxlength: 50, 
        minlength: 2,
        unique: true
    }
}) ;

schema.methods.generateJWT =function(){
    const token = jwt.sign({ _id : this._id},'thisString')
    return token;
}
const User=  new mongoose.model('User',schema)


function validateUser(user){
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user,schema)
}


module.exports.validate= validateUser
module.exports.User= User