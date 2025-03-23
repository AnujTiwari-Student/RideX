const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator');


module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        
        const {pickup , destination , vehicleType} = req.body;


        const ride = await rideService.createRide(
            {
                user: req.user._id ,
                pickup , 
                destination ,
                vehicleType
            }
        )
        return res.status(201).json(ride)


    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.generateFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {pickup , destination} = req.body;

        const fare = await rideService.generateFare(pickup , destination)
        return res.status(200).json(fare)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}