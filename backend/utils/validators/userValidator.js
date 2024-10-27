const {check,validationResult} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
exports.getUserValidator = [check('id').isUUID().withMessage('Invalid user ID format'),validatorMiddleware]

exports.postUserLoginValidator = [
    check('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
    check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
    validatorMiddleware
]

exports.postUserRegisterValidator = 
[ 
    check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .isLength({ max: 32 })
    .withMessage('Too long First name'),

    check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .isLength({ max: 32 })
    .withMessage('Too long First name'),

  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

    check('age')
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be at least 18'),

    check('role')
    .isIn(['rh', 'employee'])
    .withMessage('Role must be one of the following: admin, user, or guest'),

    check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
    validatorMiddleware
]

exports.updateUserValidator = 
[
    check('id').isUUID().withMessage('Invalid user ID format'),
    validatorMiddleware
]

exports.deleteUserValidator = 
[
    check('id').isUUID().withMessage('Invalid user ID format'),
    validatorMiddleware
]