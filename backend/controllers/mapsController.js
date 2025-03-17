const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator');

module.exports.getLocation = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {address} = req.body
    try {
        const location = await mapsService.getLocation(address)
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}