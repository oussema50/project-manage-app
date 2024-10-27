const express = require('express');
const passport = require('passport');
const router = express.Router();
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {postHolidayValidator} = require('../utils/validators/holidayValidator');
const {createHolidayRequest,getAllRequestHoliday} = require('../controllers/holidayController')
const {passportScr }=require('../utils/passport');
passportScr(passport)

router.post('/holiday-request',passport.authenticate('jwt', { session: false }),postHolidayValidator,createHolidayRequest)
router.post('/all-holidaies',passport.authenticate('jwt', { session: false }))
module.exports = router;