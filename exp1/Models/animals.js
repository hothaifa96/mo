
const mongoose = require('mongoose')
const Joi = require('joi')

const Animal = new mongoose.model('Animal', new mongoose.Schema({
    name:{
        type: String,
        required : true,
        minlength: 3 ,
        maxlength: 50
    },
    color:{
        type: String,
        required : true,
        minlength: 3 ,
        maxlength: 10
    },
    flying:{
        type: Boolean,
        required : true,
    },
    age:{
        type: Number,
        required : true,
        validate:{
            validator:function(v){
                return v > 0 && v < 220
            },
            message:'age must be between 0 and 220'
        }
    }
}) ) ;


function vaidateAnimal(animal){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        color: Joi.string().min(3).max(10).required(),
        flying: Joi.boolean().required(),
        age: Joi.number().integer().min(0).max(220).required()
    };

    return Joi.validate(animal,schema)
}

exports.Animal= Animal;
exports.validate = vaidateAnimal

 



