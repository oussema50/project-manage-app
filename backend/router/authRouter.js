const express = require('express')
const router = express.Router()
const {registerUser,loginUser} = require('../controllers/authController')

const {postUserRegisterValidator,postUserLoginValidator} = require('../utils/validators/userValidator');

router.post('/register',postUserRegisterValidator,registerUser)

router.post('/login',postUserLoginValidator,loginUser );



module.exports = router