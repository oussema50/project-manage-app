const WorkingHours = require('../models/workingHours')
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');
const User = require('../models/user')
const {timeStringToMilliseconds} = require('../utils/checkOutHoursMilliseconds')
const { Op } = require( 'sequelize');

// @desc    Create working Hours 
// @route   POST /api/v1/working-hour
// @access   Private (RH or Employee)
exports.createWorkingHour = asyncHandler(async(req,res,next)=>{

    const { id } = req.params; 
     
    console.log('req.user.id=======>>',req.user.id, id)
    // if(req.user.id != id)next(new ApiError('you are not autorized',401))

    const date = new Date().toISOString().split('T')[0]

    const today = new Date();

    const checkOutTime = "22:00";

    const [checkOutHour, checkOutMinute] = checkOutTime.split(":").map(Number);

    const checkIn = new Date(today);

    const chekcInHours = checkIn.getHours() + 1;
    const chekcInMinutes = checkIn.getMinutes();

    const totleCheckInHours = (chekcInHours * 60 * 60 * 1000) + (chekcInMinutes * 60 * 1000);


    const totleCheckOutHours = (checkOutHour * 60 * 60 * 1000) + (checkOutMinute * 60 * 1000);
    if(totleCheckInHours > totleCheckOutHours ){
        return next(new ApiError('check-in Hour is bigger than check-out time',400))
    }
    const timeDifferenceTime = totleCheckOutHours - totleCheckInHours;

    const hours = Math.floor(timeDifferenceTime / (60 * 60 * 1000)); 
    const minutes = Math.floor((timeDifferenceTime % (60 * 60 * 1000)) / (60 * 1000));
    const workingHours = `${hours} hours ${minutes} minutes`;
    const start = `${chekcInHours}:${chekcInMinutes}:00`;
    const end = `${checkOutHour}:${checkOutMinute}:00`;

    const existingWorkingHour = await WorkingHours.findOne({
        where: {
            employeeId:id,
            date
        },
        order: [['createdAt', 'DESC']]
    });
   
    if(existingWorkingHour){
        if(existingWorkingHour.date == date.toString()){
            return next(new ApiError(`You have already checked in.`,400))
        }
    }
    const workingHour = await WorkingHours.create({ 
            employeeId:id,
            date,
            startTime : start,
            endTime:end,
            hoursOfWork:workingHours
        });
    res.status(201).json({data:workingHour,msg:"your check in request is send"})
});

exports.checkOut = asyncHandler(async(req,res,next)=>{
    const {checkoutTime,hoursOfCheckOut,reason } = req.body
    const {id} = req.params
    console.log("employee id is :==================>>>>>>>",id)
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const workingHour = await WorkingHours.findOne({where:{employeeId:id,date:formattedToday}});
    console.log("workingHour are :==================>>>>>>>",workingHour)

    if (!workingHour) {
        return next(new ApiError('You are not check-in Today',400))
    }
    console.log(workingHour)
    if(workingHour.status === 'pending' ){
        return next(new ApiError('your workingHour is still pending',400))
    }else if(workingHour.status ==='rejected'){
        return next(new ApiError('you workingHour is rejected',400))
    }
   if(workingHour.checkOutStatus === "pending"){
        return next(new ApiError('you have already send a request for check-out ',400))
   }
   if(workingHour.checkOutStatus === "accepted"){
     return next(new ApiError('your request is accepted',400))
   }
    const checkouthour= timeStringToMilliseconds(hoursOfCheckOut)
    const hoursOfWork = timeStringToMilliseconds(workingHour.hoursOfWork)

    if(checkouthour > hoursOfWork){
        return next(new ApiError('Your checkout hours are greater than the hours of work.',400))
    }
    workingHour.hoursOfCheckOut = checkouthour;
    workingHour.checkOutStatus = 'pending';
    workingHour.checkoutTime = checkoutTime;
    workingHour.checkOutReason = reason;
    workingHour.save();

    return res.status(200).json({msg:"your check-out request is send. we will replay it asap"})
})

// @desc    update the status of working hours
// @route   PUT /api/v1/working-hour/update-working-hour/{id}
// @access   Private RH 
exports.updateStatusWorkingHour = asyncHandler(async(req,res,next)=>{
    const {id,status,reason} = req.body
    console.log('hello from updateStatusWorkingHour')
    const workingHours = await WorkingHours.findOne({where:{employeeId:id},order: [['createdAt', 'DESC']]})
    if(!workingHours){
        return next(new ApiError('your check-in not found',400));
    }
    workingHours.status = status;
    await workingHours.save();
    console.log('workingHours:::::====>>>>>',workingHours)
    if (workingHours.status === 'accepted') {
        res.status(200).json({
            msg: ` your check-in has been reviewed and accepted. Have a great day at work!`
        });
    }else if (workingHours.status === 'rejected') {
        res.status(200).json({
            msg: ` unfortunately, your check-in has been rejected. Please contact HR for further assistance.`,
            reson:reason
        });
    }
    
})

exports.updateCheckOutOfWork = asyncHandler(async(req,res,next)=>{
    const {employeeId,checkOutStatus} = req.body;
    const workingHours = await WorkingHours.findOne({where:{employeeId},order: [['createdAt', 'DESC']]})
    console.log('workingHours from updateCheckOutOfWork===============>>>>>>',employeeId,checkOutStatus)
    if(!workingHours)next(new ApiError('You are not check-in Today',400))
   
    if(workingHours.checkOutStatus === null ){
        return next(new ApiError('you have to sent a request of check out',400))
    }
    if(checkOutStatus === "rejected" ){
        return next(new ApiError('your check out request is rejected',400))
    }
    const checkOutHours = workingHours.hoursOfCheckOut 
    const hoursOfWork = timeStringToMilliseconds(workingHours.hoursOfWork)
    const newHoursOfWork = hoursOfWork - checkOutHours
  
    const hours = Math.floor(newHoursOfWork / (60 * 60 * 1000)); 
    const minutes = Math.floor((newHoursOfWork % (60 * 60 * 1000)) / (60 * 1000));
    console.log(`${hours} hours ${minutes} minutes`)
    workingHours.hoursOfWork = `${hours} hours ${minutes} minutes`
    workingHours.checkOutStatus = checkOutStatus
    // workingHours.save();
    return res.status(200).json({msg:'your check out request is accepted'});
})

// @desc    Get All working hours
// @route   get /api/v1/working-hour/all-working-hours
// @access   Private RH
exports.getAllWorkingHours = asyncHandler(async(req,res,next)=>{
    const { status, date,hoursOfWork,checkOutStatus,checkoutTime, page = 1, limit = 5 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const searchCriteria = {
        ...(status && { status: { [Op.like]: `%${status}%` } }),
        ...(date && { date: { [Op.eq]: `%${date}%` } }), 
        ...(hoursOfWork && { hoursOfWork: { [Op.like]: `%${hoursOfWork}%`  } }),  
        ...(checkOutStatus && { checkOutStatus: { [Op.eq]: `%${checkOutStatus}%`  } }),  
        ...(checkoutTime && { checkoutTime: { [Op.eq]: `%${checkoutTime}%`  } }),  
      };
      const { count, rows } = await WorkingHours.findAndCountAll({
        where: { ...searchCriteria },
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
      
    const totalPages = Math.ceil(count / pageSize);
    res.json({
        totalWorkingHours: count,
        totalPages,
        currentPage: pageNumber,
        workingHours: rows,
      });
})

// @desc    Get working Hours by employee Id
// @route   get /api/v1/working-hour/id
// @access   Private RH or Employee
exports.getWorkingHoursById = asyncHandler(async(req,res,next)=>{
    const {employeeId} = req.params
    
    const { status, date,hoursOfWork, page = 1, limit = 4 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const searchCriteria = {
        ...(status && { status: { [Op.like]: `%${status}%` } }),
        ...(date && { date: { [Op.eq]: `%${date}%` } }), 
        ...(hoursOfWork && { hoursOfWork: { [Op.like]: `%${hoursOfWork}%`  } }),  
 
      };
    const { count, rows } = await WorkingHours.findAndCountAll({
    where: {employeeId,...searchCriteria},
    limit: pageSize,          // Number of records to return
    offset: (pageNumber - 1) * pageSize, 
    include: [
        {
          model: User, 
          attributes: ['firstName', 'lastName','email']
        },
      ],
      order: [['createdAt', 'DESC']]
    });
    const totalPages = Math.ceil(count / pageSize);
    res.json({
        totalWorkingHours: count,
        totalPages,
        currentPage: pageNumber,
        workingHours: rows,
      });
})

