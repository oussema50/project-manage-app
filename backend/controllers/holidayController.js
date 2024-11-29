const Holiday = require('../models/holiday');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');
const User = require('../models/user')
const { Op } = require( 'sequelize');
const { io, clients } = require("../index");
// @desc    Create Holiday Request
// @route   POST /api/v1/holiday/holiday-request
// @access  Private (RH or Employee)
exports.createHolidayRequest = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const {startDate,endDate} = req.body
    const getUser = await User.findByPk(id)
    if (req.user.id != getUser.id)return next(new ApiError(`you are not autorized to change the data of other user`,404))
    const existingRequest = await Holiday.findOne({
        where: {
            employeeId:id,
            status: 'pending',
        }
    });
    const overlappingRequest = await Holiday.findOne({
        where: {
            employeeId:id,
            status: 'accepted',
            startDate: {
                [Op.lte]: new Date(endDate)
            },
            endDate: {
                [Op.gte]: new Date(startDate)
            }
        }
    });
    const lastHoliday = await Holiday.findOne({
        where:{
            employeeId:id,
            status:'accepted'
        },
        order: [['createdAt', 'DESC']]
    })
    if(overlappingRequest)next(new ApiError(`You already have an approved holiday for the specified period. Please select a different date range.`,400))
    if (existingRequest) {
        return next(new ApiError(`You already have a pending holiday request. Please wait until it is reviewed.`,400))
    }
    if(lastHoliday){
        await Holiday.create({
            employeeId:id,
            startDate,
            endDate,
            holidayDays:lastHoliday.holidayDays
        });
    }else{
        await Holiday.create({
            employeeId:id,
            startDate,
            endDate,
        });
    }
    
    res.status(200).json({msg:'your holiday request is send. we will replay it asap'})
})

// @desc    Get all Holidays Request or filter
// @route   GET /api/v1/holiday/all-holidays
// @access  Private RH 
exports.getAllRequestHoliday = asyncHandler(async(req,res,next)=>{
    const { status, startDate, endDate, page = 1, limit = 5 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    // Fetch holidays that include today in their date range
    const holidaysCount = await Holiday.findAll({
        where: {
            status: 'accepted', // Only check accepted holidays
            startDate: { [Op.lte]: formattedToday }, // Start date <= today
            endDate: { [Op.gt]: formattedToday },   // End date >= today
        },
    });
    const acceptedHolidaysCount = holidaysCount.length

    const searchCriteria = {
        ...(status && { status: { [Op.like]: `%${status}%` } }),  
        ...(startDate && { startDate: { [Op.eq]: new Date(startDate) } }),  
        ...(endDate && { endDate: { [Op.eq]: new Date(endDate) } }),  
    }
   
    
    
    console.log('Accepted Holidays Count:', holidaysCount);
        const { count, rows } = await Holiday.findAndCountAll({
        where: searchCriteria,
        limit: pageSize,          // Number of records to return
        offset: (pageNumber - 1) * pageSize, // Calculate offset
        include: [
            {
              model: User, 
              attributes: ['firstName', 'lastName','email']
            },
          ],
          order: [['createdAt', 'DESC']]
    });
    // console.log('rows=========///////////////=====',rows)
    const totalPages = Math.ceil(count / pageSize);
    res.status(200).json({
        totalholidayRequest: count,
        totalPages,
        currentPage: pageNumber,
        holidayRequest: rows,
        acceptedHolidaysCount
      });

});

// @desc    Update  Holiday Request By User Id
// @route   PUT /api/v1/holiday/update-holiday/:id
// @access  Private RH 
exports.updateHolidayRequestStatus = asyncHandler(async(req,res,next)=>{
    const { status, reason,employeeId } = req.body;
  
    const holidayRequest = await Holiday.findOne({
        where: {
            employeeId
        },
        order: [['createdAt', 'DESC']]  
    });
    if (!holidayRequest) return next(new ApiError(`Request not found`,404)) ;
    if(holidayRequest.status == "accepted"){
            // io.emit("notification", { message:'holiday is already accepted' });
          
        return next(new ApiError(`holiday is already accepted.`,404))
    };
    if(holidayRequest.status =="rejected"){
            // io.emit("notification", { message:'holiday is already rejected' });
        return next(new ApiError(`holiday is already rejected`,404));
    }
    if( holidayRequest.holidayDays == 0){
            // io.emit("notification", { message:'You have no remaining holiday days' });
        
        return next(new ApiError(`You have no remaining holiday days.`,404));
    }
    const start = new Date(holidayRequest.startDate);
    const end = new Date(holidayRequest.endDate);
   
    const differenceInMs = end - start;

    const days = Math.round(differenceInMs / (1000 * 60 * 60 * 24));
    holidayRequest.status = status;
    if (status === 'rejected') {

    holidayRequest.rejectionReason = reason;
    await holidayRequest.save();
    return res.status(200).json({msg:reason});
    
    }else{
    
    if(days > holidayRequest.holidayDays){
        holidayRequest.status = 'rejected';
        holidayRequest.rejectionReason = `You requested ${days} days, but you only have ${holidayRequest.holidayDays} holiday days remaining.`;
        // return next(new ApiError(`You requested ${days} days, but you only have ${holidayRequest.holidayDays} holiday days remaining.`,404))
    }else{
        // io.emit("notification", { message:'your holiday is accepted' });

        holidayRequest.holidayDays = holidayRequest.holidayDays - days;
    }
    
    }
    
    await holidayRequest.save();
    res.status(200).json({data:holidayRequest,holidayDays:days});
});
// @desc    Get  Holiday Request By User ID
// @route   GET /api/v1/holiday/user-haliday/:id
// @access  Private (RH or employee)
exports.getHolidayRequestsByEmployee = asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    if(req.user.id != id)return next(new ApiError(`you are not autorized`,404))
    const requests = await Holiday.findAll({
        where: {employeeId: id },
        // include: User,
        order: [['createdAt', 'DESC']]
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

