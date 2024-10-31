const express = require('express');
const passport = require('passport');
const router = express.Router();
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {postHolidayValidator} = require('../utils/validators/holidayValidator');
const {createHolidayRequest,getAllRequestHoliday,updateHolidayRequestStatus,getHolidayRequestsByEmployee} = require('../controllers/holidayController')
const {passportScr }=require('../utils/passport');
passportScr(passport)

router.post('/holiday-request',passport.authenticate('jwt', { session: false }),postHolidayValidator,createHolidayRequest)
router.post('/all-holidays',passport.authenticate('jwt', { session: false }),isRH,getAllRequestHoliday)
router.post('/holiday-responce/:id',passport.authenticate('jwt', { session: false }),isRH,updateHolidayRequestStatus)
router.post('/holiday-user/:id',passport.authenticate('jwt', { session: false }),getHolidayRequestsByEmployee)
module.exports = router;