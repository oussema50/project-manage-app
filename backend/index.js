const express = require('express');
const dotenv = require("dotenv");
const passport = require('passport');
const globalError = require('./middlewares/errorMiddleware');
const app = express();
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const holidayRouter = require('./router/holidayRouter');
const ApiError = require('./utils/ApiError');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors')
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(passport.initialize());

//Router
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/holiday',holidayRouter);

//Route Not Found
app.use('*',(req,res,next)=>{
    next(new ApiError(`can't find this URL: ${req.originalUrl}`,400));
});
//handle global error
app.use(globalError);



app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});


//Handle Rejection Outside Express 
process.on('unhandledRejection',(err)=>{
    console.error(`unhandleRejection Error: ${err.name} | ${err.message}`);
    process.exit(1);
});