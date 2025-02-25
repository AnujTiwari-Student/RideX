const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {registerUser, loginUser , userProfile , logoutUser} = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/auth.middleware')

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 character long"),
] , registerUser)

router.post('/login' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 character long"),
] , loginUser)

router.get('/profile' , isLoggedIn , userProfile)

router.get('/logout' , isLoggedIn , logoutUser)

module.exports = router;