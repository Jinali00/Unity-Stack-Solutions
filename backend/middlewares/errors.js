

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || 'Internal Server Error',
    };

    if (process.env.Node_env === 'DEVELOPMENT'){

        res.status(err.statusCode).json(
            {
                message: error.message,
                error:err,
                stack:err?.stack,
            }
        );
    }

    if (process.env.Node_env === 'PRODUCTION'){
        
        res.status(err.statusCode).json(
            {
                message: error.message,
            }
        );
    }

    
};

