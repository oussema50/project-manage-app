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
            status:'pending'
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
    res.status(201).json({data:workingHour})
});

// @desc    update the status of working hours
// @route   PUT /api/v1/working-hour/update-working-hour/{id}
// @access   Private RH 
exports.updateStatusWorkingHour = asyncHandler(async(req,res,next)=>{
    const {status} = req.body
    const {id} = req.params
    const workingHours = WorkingHours.findOne()
})

// @desc    Get All working hours
// @route   get /api/v1/working-hour/all-working-hours
// @access   Private RH
exports.getAllWorkingHours = asyncHandler(async(req,res,next)=>{
    const { status, date,hoursOfWork, page = 1, limit = 3 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const searchCriteria = {
        ...(status && { status: { [Op.eq]: `%${status}%` } }),
        ...(date && { date: { [Op.eq]: `%${date}%` } }), 
        ...(hoursOfWork && { hoursOfWork: { [Op.eq]: hoursOfWork } }),  
      };
    const { count, rows } = await WorkingHours.findAndCountAll({
    where: searchCriteria,
    limit: pageSize,          // Number of records to return
    offset: (pageNumber - 1) * pageSize, // Calculate offset
    });
    const totalPages = Math.ceil(count / pageSize);
    res.json({
        totalUsers: count,
        totalPages,
        currentPage: pageNumber,
        workingHours: rows,
      });
})

// @desc    Get working Hours by employee Id
// @route   get /api/v1/working-hour/id
// @access   Private RH or Employee
exports.getWorkingHoursById = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const { status, date,hoursOfWork, page = 1, limit = 3 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const searchCriteria = {
        ...(status && { status: { [Op.eq]: `%${status}%` } }),
        ...(date && { date: { [Op.eq]: `%${date}%` } }), 
        ...(hoursOfWork && { hoursOfWork: { [Op.eq]: hoursOfWork } }),  
      };
    const { count, rows } = await WorkingHours.findAndCountAll({
    where: {employeeId:id,...searchCriteria},
    limit: pageSize,          // Number of records to return
    offset: (pageNumber - 1) * pageSize, // Calculate offset
    });
    const totalPages = Math.ceil(count / pageSize);
    res.json({
        totalUsers: count,
        totalPages,
        currentPage: pageNumber,
        workingHours: rows,
      });
})