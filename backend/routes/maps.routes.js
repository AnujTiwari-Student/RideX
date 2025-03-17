const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middlewares/auth.middleware')
const { getLocation } = require('../controllers/mapsController')
const { query } = require('express-validator')

router.get('/location' ,
    query('address').isLength({min: 3}).withMessage("Address must be at least 3 character long"),
    isLoggedIn , getLocation)

module.exports = router