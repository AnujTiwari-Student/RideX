const blacklistTokenModel = require('../models/blacklistToken-model');
const captainModel = require('../models/captain-model')
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')

module.exports.createCaptain = async (req , res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const { firstname , lastname , email , password , status , vehicleColor , vehicleType , vehiclePlate , vehicleCapacity } = req.body;

        const captainExist = await captainModel.findOne({email})
        if(captainExist){
            return res.status(400).json({message: 'Captain already exist'})
        }

        const hashedPassword = await captainModel.hashPassword(password)

        const captain = await captainService.createCaptain({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            status,
            vehicleColor,
            vehiclePlate,
            vehicleType,
            vehicleCapacity,
        })

        const token = captain.generateAuthToken();

        res.cookie('token', token , {httpOnly: true})

        res.status(201).json({token , captain})

    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.getCaptain = async (req , res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email , password} = req.body;

        const captain = await captainModel.findOne({email}).select('+password')

        if(!captain){
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const isMatch = await captain.comparePassword(password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token)

        res.status(200).json({token , captain})

    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports.captainProfile = async (req , res)=>{
    res.status(200).json(req.captain)
}

module.exports.captainLogout = async (req , res)=>{
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const result = await blacklistTokenModel.updateOne(
        { token }, 
        { $set: { token, createdAt: new Date() } }, 
        { upsert: true } 
    );
    res.status(200).json({message: 'Logout successfully'})
}