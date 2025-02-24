const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {registerUser} = require('../controllers/userController')

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 character long"),
] , registerUser)

module.exports = router;