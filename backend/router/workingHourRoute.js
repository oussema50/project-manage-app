const passport = require('passport');
const express = require('express');
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {passportScr }=require('../utils/passport');
const {createWorkingHour} = require('../controllers/workingHoursController')
const {postCreateHoursValidator} = require('../utils/validators/workingHoursValidator');
passportScr(passport)
const router = express.Router()
router.post('/',passport.authenticate('jwt', { session: false }),postCreateHoursValidator,createWorkingHour)

module.exports = router;