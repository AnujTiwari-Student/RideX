const express = require('express')
const { isLoggedIn, isCaptain } = require('../middlewares/auth.middleware')
const { body } = require('express-validator')
const { createRide , generateFare , fetchAllRides , deleteRide , confirmRide } = require('../controllers/rideController')
const router = express.Router()

router.post('/create',
    body('pickup').isLength({min: 3}).withMessage("Pickup must be at least 3 character long"),
    body('destination').isLength({min: 3}).withMessage("Destination must be at least 3 character long"),
    body('vehicleType').isIn(['car' , 'motorcycle' , 'auto']).withMessage('Invalid vehicle type'),
    isLoggedIn , createRide)

router.post('/fare', 
    body('pickup').isLength({min: 3}).withMessage("Pickup must be at least 3 character long"),
    body('destination').isLength({min: 3}).withMessage("Destination must be at least 3 character long"),
    isLoggedIn , generateFare)

router.get('/all-rides', isLoggedIn , fetchAllRides)

router.delete('/delete/:rideId' , isLoggedIn , deleteRide)

router.post('/confirm' ,
    body('rideId').isLength({min: 3}).withMessage("Invalid ride id")   
    , isCaptain , confirmRide)

module.exports = router