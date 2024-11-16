const passport = require('passport');
const express = require('express');
const {isRH,isEmployee} = require('../middlewares/protectedRoute');
const {passportScr }=require('../utils/passport');
const {
    createWorkingHour,
    getAllWorkingHours,
    getWorkingHoursById,
    updateStatusWorkingHour,
    checkOut,
    updateCheckOutOfWork
} = require('../controllers/workingHoursController')
const {postCreateHoursValidator} = require('../utils/validators/workingHoursValidator');
passportScr(passport)
const router = express.Router()
router.post('/checkIn/:employeeId',passport.authenticate('jwt', { session: false }),createWorkingHour)
router.put('/checkOut-request/:employeeId',passport.authenticate('jwt', { session: false }),checkOut)
router.get('/all-working-hours',passport.authenticate('jwt', { session: false }),isRH,getAllWorkingHours)
router.get('/all-working-hours/:employeeId',passport.authenticate('jwt', { session: false }),getWorkingHoursById)
router.put('/update-status',passport.authenticate('jwt', { session: false }),isRH,updateStatusWorkingHour)
router.put('/update-check-out-request',passport.authenticate('jwt', { session: false }),isRH,updateCheckOutOfWork)

module.exports = router;