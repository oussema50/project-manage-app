const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc     Create A User
// @route    POST /register
// @access   Public

exports.registerUser = asyncHandler(async(req,res,next)=>{
    const {firstName,lastName,email,age,password,role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({firstName,lastName,email,age,password:hashedPassword,role});
    res.status(200).json({data:user});
})

// @desc     login A User
// @route    POST /login
// @access   Public
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
      const user = await User.findOne({ where: { email:email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const payload = { id: user.id, role: user.role };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token,data:{firstName:user.firstName,lastName:user.lastName,email:user.email,age:user.age,} });
    
})

