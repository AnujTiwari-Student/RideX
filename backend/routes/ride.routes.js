const express = require('express')
const { isLoggedIn } = require('../middlewares/auth.middleware')
const { body } = require('express-validator')
const { createRide , generateFare , fetchAllRides } = require('../controllers/rideController')
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

module.exports = router