const express = require('express')
const captainController = require('../controllers/captainController')
const router = express.Router()
const {body} = require('express-validator')
const { isCaptain } = require('../middlewares/auth.middleware')

router.post('/register' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstname').isLength({min: 3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 character long"),
    body('vehicleColor').isLength({min: 3}).withMessage("Color must be at least 3 character long"),
    body('vehiclePlate').isLength({min: 3}).withMessage("Plate must be at least 3 character long"),
    body('vehicleCapacity').isInt({min: 1}).withMessage("Capacity must be at least 1"),
    body('vehicleType').isIn(['car' , 'motorcycle' , 'auto']).withMessage('Invalid vehicle type'),
] , captainController.createCaptain)

router.post('/login' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 character long"),
] , captainController.getCaptain)

router.get('/profile' , isCaptain , captainController.captainProfile)

router.get('/logout' , isCaptain , captainController.captainLogout)

module.exports = router;