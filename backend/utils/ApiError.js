//@desc     this class is responsible for operation errors(errors that i can predict)
class ApiError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')?'faild':'error';
        this.isOperational = true;
    }
}

module.exports = ApiError;