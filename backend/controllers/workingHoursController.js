const WorkingHours = require('../models/workingHours')
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');
const User = require('../models/user')
const { Op } = require( 'sequelize');

// @desc    Create working Hours 
// @route   POST /api/v1/working-hour
// @access   Private (RH or Employee)
exports.createWorkingHour = asyncHandler(async(req,res,next)=>{
    const { employeeId,startTime,endTime } = req.body;
    const date = new Date().toISOString().split('T')[0]

    const today = new Date();
    
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), ...startTime.split(':'));
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), ...endTime.split(':'));

    const differenceInMilliseconds = end - start;

    const hours = differenceInMilliseconds / (1000 * 60 * 60);
    const existingWorkingHour = await WorkingHours.findOne({
        where: {
            employeeId,
        },
        order: [['createdAt', 'DESC']]
    });
   
    if(req.user.id != employeeId)next(new ApiError('you are not autorized'))
    if(existingWorkingHour){
        if(existingWorkingHour.date == date.toString()){
            next(new ApiError(`You have already checked in.`,400))
        }
    }
    const workingHour = await WorkingHours.create({ employeeId, date, startTime, endTime, hoursOfWork:hours});
    res.status(201).json(workingHour)
});

exports.updateWorkingHour = asyncHandler(async(req,res,next)=>{
    const {status} = req.body
})