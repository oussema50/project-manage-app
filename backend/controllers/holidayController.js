const Holiday = require('../models/holiday');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('express-async-handler');
const { Op } = require( 'sequelize');
exports.createHolidayRequest = asyncHandler(async(req,res,next)=>{
    const {employeeId,startDate,endDate} = req.body

    const request = await Holiday.create({
        employeeId,
        startDate,
        endDate,
    });
    res.status(200).json({msg:'your holiday request is send. we will replay it asap'})
})

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