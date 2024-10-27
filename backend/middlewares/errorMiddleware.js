const globalError = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status
   if(process.env.NODE_ENV == "production"){
    sendErrorForproduction(err,res)

   }else{
    sendErrorForDev(err,res)

   }
}

const sendErrorForDev = (err,res)=>{
    return  res.status(err.statusCode).json({
        status:err.status,
        err:err,
        message:err.message,
        stack:err.stack,
    })
}
const sendErrorForproduction = (err,res)=>{
    return  res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })
}
module.exports = globalError;