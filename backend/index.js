const express = require('express');
const dotenv = require("dotenv");
const passport = require('passport');
const globalError = require('./middlewares/errorMiddleware');
const app = express();
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const holidayRouter = require('./router/holidayRouter');
const workingHourRoute = require('./router/workingHourRoute')
const ApiError = require('./utils/ApiError');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {cors: {
    origin: 'http://localhost:3000', // React app's origin
    methods: ['GET', 'POST', 'PUT'], // Allowed methods
}})

const cors = require('cors')
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(passport.initialize());
const onlineUsers = new Map();
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  
  
  socket.on('sendmessage', ({ userId, message }) => {
    
    for (let [key, value] of onlineUsers.entries()) {
        
        const strKey = key.toString()
        if (strKey === userId) {
           
            io.to(value).emit('message', { message });
        }
    }
    
  })
  socket.on('login',(userId)=>{
    onlineUsers.set(userId,socket.id)
    console.log("onlineUsers============>>>>>",onlineUsers)
    console.log(`User ${userId} registered with socket ID: ${socket.id}`)
  })
  
  socket.on("disconnect", () => {
        // for (let [userId, id] of onlineUsers.entries()) {
        //     if (id === socket.id) {
        //         onlineUsers.delete(userId);
        //         console.log(`User ${userId} disconnected`);
        //         break;
        //     }
        // }
        console.log('disconnect')
    })
})

//Router
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/holiday',holidayRouter);
app.use('/api/v1/working-hour',workingHourRoute);

//Route Not Found
app.use('*',(req,res,next)=>{
    next(new ApiError(`can't find this URL: ${req.originalUrl}`,400));
});
//handle global error
app.use(globalError);



server.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});


//Handle Rejection Outside Express 
process.on('unhandledRejection',(err)=>{
    console.error(`unhandleRejection Error: ${err.name} | ${err.message}`);
    process.exit(1);
});

module.exports = app