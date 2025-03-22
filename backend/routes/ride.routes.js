const express = require('express')
const { isLoggedIn } = require('../middlewares/auth.middleware')
const { body } = require('express-validator')
const { createRide } = require('../controllers/ride.controller')
const router = express.Router()

router.post('/create',
    body('userId').isLength({min: 3}).withMessage("Origin must be at least 3 character long"),
    body('pickup').isLength({min: 3}).withMessage("Pickup must be at least 3 character long"),
    body('destination').isLength({min: 3}).withMessage("Destination must be at least 3 character long")
    ,isLoggedIn , createRide)

module.exports = router