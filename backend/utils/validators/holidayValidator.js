const {check,validationResult} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.postHolidayValidator =[
    check('employeeId').notEmpty().withMessage('employee id is required') 
    .isISO8601().withMessage('Start date must be in YYYY-MM-DD format.'),
    check('startDate').notEmpty().withMessage('start Date is required'),
    check('endDate').notEmpty().withMessage('start Date is required')
    .isISO8601().withMessage('End date must be in YYYY-MM-DD format.')
        .custom((value, { req }) => {
            if (new Date(value) < new Date(req.body.startDate)) {
                throw new Error('End date must be after start date.');
            }
            return true;
        }),
    

]