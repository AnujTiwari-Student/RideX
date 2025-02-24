const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
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
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: Number
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id} , process.env.JWT_SECRET)
    return token
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password , 10)
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}

module.exports = mongoose.model('user' , userSchema)