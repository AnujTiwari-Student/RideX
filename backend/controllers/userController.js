const userModel = require('../models/user-model')
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken-model')

module.exports.registerUser = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname , password , email} = req.body;

    const userExist = await userModel.findOne({email})
    if(userExist){
        return res.status(400).json({message: 'User already exist'})
    }

    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        fullname,
        email,
        password: hashedPassword,
    })

    const token = user.generateAuthToken();
    res.cookie('token', token , {httpOnly: true})

    res.status(200).json({token , user})
}

module.exports.loginUser = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email , password} = req.body;

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({message: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)

    res.status(200).json({token , user})
}

module.exports.userProfile = async function(req, res){
    res.status(200).json(req.user);
}

module.exports.logoutUser = async function(req, res){
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token: token})
    res.status(200).json({message: 'Logged out successfully'})
}