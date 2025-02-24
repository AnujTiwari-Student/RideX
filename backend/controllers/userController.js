const userModel = require('../models/user-model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')

module.exports.registerUser = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname , password , email} = req.body;

    // console.log(req.body)

    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    })

    const token = user.generateAuthToken();

    res.status(200).json({token , user})
}