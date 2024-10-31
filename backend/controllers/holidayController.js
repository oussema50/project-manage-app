const Holiday = require('../models/holiday');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');
const User = require('../models/user')
const { Op } = require( 'sequelize');

// @desc    Create Holiday Request
// @route   POST /api/v1/holiday/holiday-request
// @access  Private (RH or Employee)
exports.createHolidayRequest = asyncHandler(async(req,res,next)=>{
    const {employeeId,startDate,endDate} = req.body
    
    const existingRequest = await Holiday.findOne({
        where: {
            employeeId,
            status: 'pending',
        }
    });
    const overlappingRequest = await Holiday.findOne({
        where: {
            employeeId,
            status: 'accepted',
            startDate: {
                [Op.lte]: new Date(endDate)
            },
            endDate: {
                [Op.gte]: new Date(startDate)
            }
        }
    });
    if(overlappingRequest)next(new ApiError(`You already have an approved holiday for the specified period. Please select a different date range.`,400))
    if (existingRequest) {
        return next(new ApiError(`You already have a pending holiday request. Please wait until it is reviewed.`,400))
    }
    const request = await Holiday.create({
        employeeId,
        startDate,
        endDate,
    });
    res.status(200).json({msg:'your holiday request is send. we will replay it asap'})
})

// @desc    Get all Holidays Request or filter
// @route   GET /api/v1/holiday/all-holidays
// @access  Private RH 
exports.getAllRequestHoliday = asyncHandler(async(req,res,next)=>{
    const { status, dateStart, dateEnd, page = 1, limit = 5 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const searchCriteria = {
        ...(status && { status: { [Op.eq]: `%${status}%` } }),  
        ...(dateStart && { dateStart: { [Op.gte]: new Date(startDate) } }),  
        ...(dateEnd && { dateEnd: { [Op.lte]: new Date(dateEnd) } }),  
    }
    const { count, rows } = await Holiday.findAndCountAll({
        where: searchCriteria,
        limit: pageSize,          // Number of records to return
        offset: (pageNumber - 1) * pageSize, // Calculate offset
    });
    const totalPages = Math.ceil(count / pageSize);
    res.status(200).json({
        totalholidayRequest: count,
        totalPages,
        currentPage: pageNumber,
        holidayRequest: rows,
      });

});

// @desc    Update  Holiday Request By User Id
// @route   PUT /api/v1/holiday/update-holiday/:id
// @access  Private RH 
exports.updateHolidayRequestStatus = asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const { status, rejectionReason } = req.body;
    
    const holidayRequest = await Holiday.findOne({
        where: {
            employeeId: id
        }    
      })

      if (!holidayRequest) return next(new ApiError(`Request not found`,404)) 

      holidayRequest.status = status;
      if (status === 'Rejected') {
        return next(new ApiError(`${rejectionReason}`,404))
        
      }else{
        const start = new Date(holidayRequest.startDate);
        const end = new Date(holidayRequest.endDate);
        if( holidayRequest.holidayDays == 0){
            return next(new ApiError(`You have no remaining holiday days.`,404))
        }
        const differenceInMs = end - start;
      
        const Days = Math.round(differenceInMs / (1000 * 60 * 60 * 24));
        if(Days > holidayRequest.holidayDays){
            holidayRequest.status = 'Rejected'
            return next(new ApiError(`You requested ${Days} days, but you only have ${holidayRequest.holidayDays} holiday days remaining.`,404))
        }
      
      }
      
      await holidayRequest.save();
      res.status(200).json(holidayRequest);
});

// @desc    Get  Holiday Request By User ID
// @route   GET /api/v1/holiday/user-haliday/:id
// @access  Private (RH or employee)
exports.getHolidayRequestsByEmployee = asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const requests = await Holiday.findAll({
        where: { id },
        include: User,
        order: [['createdAt', 'ASC']]
      });
      res.json(requests);
})

// @desc    Delete  Holiday Request By User ID and send Notification
// @route   DELETE  /api/v1/holiday/delete-haliday/:id
// @access  Private (RH)

exports.deleteHolidayRequestsByEmployee = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const userHoliday = await Holiday.findByPk(id)
    if (!userHoliday) {
        return next(new ApiError(`No user for this id ${id}`,404));
      } 
     const deletedUserHoliday = await userHoliday.destroy();
     console.log(deletedUserHoliday)
     res.status(200).json({msg:"user holiday deleted successfully"});

})

