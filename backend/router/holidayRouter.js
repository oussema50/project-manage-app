const express = require('express');
const passport = require('passport');
const router = express.Router();
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {postHolidayValidator} = require('../utils/validators/holidayValidator');
const { createHolidayRequest,
        getAllRequestHoliday,
        updateHolidayRequestStatus,
        getHolidayRequestsByEmployee,
        deleteHolidayRequestsByEmployee
    } = require('../controllers/holidayController')
const {passportScr }=require('../utils/passport');
passportScr(passport)

router.post('/holiday-request',passport.authenticate('jwt', { session: false }),postHolidayValidator,createHolidayRequest)
router.get('/all-holidays',passport.authenticate('jwt', { session: false }),isRH,getAllRequestHoliday)
router.put('/holiday-responce/:id',passport.authenticate('jwt', { session: false }),isRH,updateHolidayRequestStatus)
router.get('/holiday-user/:id',passport.authenticate('jwt', { session: false }),getHolidayRequestsByEmployee)
router.delete('/holiday-user/delete/:id',passport.authenticate('jwt', { session: false }),isRH,deleteHolidayRequestsByEmployee)
module.exports = router;