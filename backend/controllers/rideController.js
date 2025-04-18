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
        
        const getLocationCordinates = await mapsService.getLocation(pickup)
        
        const captains = await mapsService.getNearByCaptains(getLocationCordinates.lat , getLocationCordinates.lng , 2000)

        const rideData = await rideModel.findOne({_id: ride._id}).populate('user').select('-otp')

        if(captains.length > 0){
            captains.map(captain => {
                console.log("Sending message to captain: ", captain.socketId)
                sendMessageToSocketId(captain.socketId , {
                    event: 'new-ride',
                    data: rideData,
                })
            });
        }
        
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
        const rides = await rideModel.find({ status: "pending" }).populate('user').select('-otp');
        // console.log("Rides: ", rides)
        res.status(200).json(rides)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.deleteRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {rideId} = req.params;
        const deletedRide = await rideService.deleteRide(rideId)
        res.status(200).json({
            message: "Ride deleted successfully",
            ride: deletedRide
        })
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

module.exports.confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rideId} = req.body;

        const ride = await rideService.confirmRide(rideId , req.captain._id)
        if(!ride){
            return res.status(404).json({message: "Ride not found"})
        }
        console.log("User Socket ID: ", ride.user.socketId)
        // console.log("Ride: ", ride)
        sendMessageToSocketId(ride.user.socketId , {
            event: 'ride-confirmed',
            data: ride,
        })

        res.status(200).json(ride)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.startRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rideId , otp} = req.body;

        const ride = await rideService.startRide(rideId , otp)
        if(!rideId && !otp){
            return res.status(404).json({message: "Ride not found"})
        }

        console.log("User Socket ID: ", ride.user.socketId)
        sendMessageToSocketId(ride.user.socketId , {
            event: 'ride-started',
            data: ride,
        })

        res.status(200).json(ride)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.rideArriving = async (req , res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rideId} = req.body;

        const ride = await rideService.rideArriving(rideId)
        if(!ride){
            return res.status(404).json({message: "Ride not found"})
        }

        sendMessageToSocketId(ride.user.socketId , {
            event: 'ride-arriving',
            data: ride,
        })

        res.status(200).json(ride)
    }
    catch (error) {
        console.log("Error: ", error)
        res.status(500).json({message : error.message})   
    }   
}

module.exports.cancelRide = async (req , res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rideId} = req.body;

        const ride = await rideService.cancelRide(rideId)
        if(!ride){
            return res.status(404).json({message: "Ride not found with ID: " + rideId})
        }

        sendMessageToSocketId(ride.user.socketId , {
            event: 'ride-cancelled',
            data: ride,
        })

        res.status(200).json(ride)

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({message : error.message})   
    }
}

module.exports.finishRide = async (req , res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rideId} = req.body;

        const ride = await rideService.finishRide(rideId)
        if(!ride){
            return res.status(404).json({message: "Ride not found"})
        }

        console.log("User Socket ID: ", ride.user.socketId)
        sendMessageToSocketId(ride.user.socketId , {
            event: 'ride-ended',
            data: ride,
        })

        res.status(200).json(ride)
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({message : error.message})   
    }
}