

const errorHandlers = async (err,req,res,next) =>{


    const status = err.status || 400;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || "Error from backend";

    return res.status(status).json({message,extraDetails});

}


module.exports = errorHandlers;