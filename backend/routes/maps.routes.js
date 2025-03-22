const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/auth.middleware')
const { getLocation , getDistance , getLocationSuggestion } = require('../controllers/mapsController')
const { query } = require('express-validator')

router.get('/location' ,
    query('address').isLength({min: 3}).withMessage("Address must be at least 3 character long"),
    isLoggedIn , getLocation
)

router.get('/distance',
    query('origin').isLength({min: 3}).withMessage("Origin must be at least 3 character long"),
    query('destination').isLength({min: 3}).withMessage("Destination must be at least 3 character long"),
    isLoggedIn , getDistance
)

router.get('/location-suggestion',
    query('input').isLength({min: 3}).withMessage("Input must be at least 3 character long"),
    isLoggedIn , getLocationSuggestion
)

module.exports = router