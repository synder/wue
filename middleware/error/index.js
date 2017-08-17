/**
 * @author synder on 2017/2/23
 * @copyright
 * @desc
 */


exports.notFoundHandler = function () {
    return function (req, res, next) {
        next(new NotFoundError(req.method + ':' + req.path));
    }
};

exports.serverErrorHandler = function () {
    return function (err, req, res, next) {

        err.code = ~~err.code;
        
        if (!err.code) {
            err.code = 500;
        }
        
        if(err.code < 500){
            console.error(err.message);
        }else{
            console.error(err.stack);
        }

        if (!err.message) {
            err.message = 'server error, please try again later';
        }

        res.status(200).json({
            flag: '0' + err.code,
            msg: err.message,
            result: null
        });
    }
};