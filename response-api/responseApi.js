// Send any success response
exports.success = (message, result, statusCode) => {
return {
    message,
    error : false,
    code: statusCode,
    result
    };
};

// Send error response
exports.error = (message, statusCode)=>{
    return{
        message,
        code: statusCode,
        error: true
    };
};