const rideService = require('../services/ride.service')
const rideModel = require('../models/ride-model')
const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket')


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

        // console.log("Ride Created: ", ride)
        
        const getLocationCordinates = await mapsService.getLocation(pickup)
        console.log("Pickup Location: ", getLocationCordinates)
        
        const captains = await mapsService.getNearByCaptains(getLocationCordinates.lat , getLocationCordinates.lng , 2000)
        console.log("Captains in radius: ", captains)

        const rideData = await rideModel.findOne({_id: ride._id}).populate('user')
        console.log("Ride Data: ", rideData)        
        
        res.status(201).json({
            ride: rideData,
            captains
        });

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.fetchAllRides = async (req, res) => {
    try {
        const rides = await rideModel.find().populate('user')
        res.status(200).json(rides)
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