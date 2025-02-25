const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3 , 'First Name must be at least 3 character long']
        },
        lastname: {
            type: String,
            minLength: [3 , 'Last Name must be at least 3 character long']
        }
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/ , 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: String,
    status:{
        type: String,
        enum: ['active' , 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            minLength: [3 , 'Plate must be at least 3 character long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1 , 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            enum: ['car' , 'motorcycle' , 'auto'],
            required: true
        }   
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id} , process.env.JWT_SECRET , {expiresIn: '24h'})
    return token
}

captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password , 10)
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

module.exports = mongoose.model('captain', captainSchema)