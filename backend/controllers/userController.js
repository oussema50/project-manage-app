const asyncHandler = require('express-async-handler');
const User  = require('../models/user');  // Assuming User model is in models folder
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
// @desc    Get all Users or filter
// @route   GET /api/users
// @access  Private (RH or Employee)
exports.getAllUsers = asyncHandler(async (req, res) => {
    const { firstName, email, role, page = 1, limit = 3 } = req.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const searchCriteria = {
        ...(firstName && { firstName: { [Op.like]: `%${firstName}%` } }),  // partial match for name
        ...(email && { email: { [Op.like]: `%${email}%` } }),  // partial match for email
        ...(role && { role: { [Op.eq]: role } }),  // exact match for role
      };
    const { count, rows } = await User.findAndCountAll({
    where: searchCriteria,
    limit: pageSize,          // Number of records to return
    offset: (pageNumber - 1) * pageSize, // Calculate offset
    });
    const totalPages = Math.ceil(count / pageSize);
    res.json({
        totalUsers: count,
        totalPages,
        currentPage: pageNumber,
        users: rows,
      });
});


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (RH or Employee)
exports.getUserById = asyncHandler(async (req, res,next) => {
    const {id}= req.params
    const user = await User.findByPk(id);
    if(!user){
        return next(new ApiError(`No user for this id ${id}`,404))
    }
    res.json({data:user});
    
  });
// @desc    Update user by ID
// @route   GET /api/users/update/:id
// @access  Private (RH or Employee)
exports.updateEmployeeById = asyncHandler(asyncHandler(async(req,res,next)=>{
    const {firstName,lastName,email,age} = req.body
    const {id}= req.params
    const user = await User.findByPk(id);
    if(!user){
        return next(new ApiError(`No user for this id ${id}`,404))
    }
    if(user.id !== id  ){
      return next(new ApiError(`you are not autorized to change the data of other user`,404))
    }
    const updatedUser = await user.update({
        firstName: firstName || user.firstName,
        lastName:lastName ||user.lastName,
        email: email || user.email,
        age:age || user.age,
        role: user.role,
    });
    res.status(200).json({data:{
      firstName:updatedUser.firstName,
      lastName:updatedUser.lastName,
      email:updatedUser.email,
      age:updatedUser.age
    }});
}));

// @desc    Delete user
// @route   DELETE /api/users/delete/:id
// @access  Protected (RH)
exports.deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params
    const user = await User.findByPk(id);
  
    if (!user) {
      return next(new ApiError(`No user for this id ${id}`,404));
    } 
   const deletedUser = await user.destroy();
   res.status(200).json({msg:"user deleted successfully"});

});
