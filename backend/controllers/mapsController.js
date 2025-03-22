const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator');

module.exports.getLocation = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {address} = req.query
    try {
        const location = await mapsService.getLocation(address)
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.getDistance = async (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {origin , destination} = req.query
    try {
        const distance = await mapsService.getDistance(origin , destination)
        res.status(200).json(distance)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.getLocationSuggestion = async (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {input} = req.query
    try {
        const location = await mapsService.getLocationSuggestion(input)
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}