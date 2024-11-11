const passport = require('passport');
const express = require('express');
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {passportScr }=require('../utils/passport');
const {createWorkingHour,getAllWorkingHours,getWorkingHoursById,updateStatusWorkingHour} = require('../controllers/workingHoursController')
const {postCreateHoursValidator} = require('../utils/validators/workingHoursValidator');
passportScr(passport)
const router = express.Router()
router.get('/all-working-hours',passport.authenticate('jwt', { session: false }),isRH,getAllWorkingHours)
router.get('/update-status/:id',passport.authenticate('jwt', { session: false }),isRH,getAllWorkingHours)
router.post('/',passport.authenticate('jwt', { session: false }),postCreateHoursValidator,createWorkingHour)

module.exports = router;