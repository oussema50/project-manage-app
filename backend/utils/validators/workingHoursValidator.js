const {check,validationResult} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

exports.postCreateHoursValidator = [
    check('employeeId').notEmpty().withMessage('employee id is required'),
    check('startTime').notEmpty().withMessage('start Date is required'),
    check('endTime').notEmpty().withMessage('start Date is required'),
    validatorMiddleware
]
