const passport = require('passport');
const express = require('express');
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {passportScr }=require('../utils/passport');
const {getAllUsers, getUserById, updateEmployeeById, deleteUser} = require('../controllers/userController')
passportScr(passport)
const router = express.Router()
router.get('/',passport.authenticate('jwt', { session: false }), isRH,getAllUsers)
router.get('/employee/:id',passport.authenticate('jwt', { session: false }),getUserById)
router.put('/employee/update/:id',passport.authenticate('jwt', { session: false }),updateEmployeeById)
router.delete('/employee/delete:id',passport.authenticate('jwt', { session: false }),isRH,deleteUser)
module.exports = router;