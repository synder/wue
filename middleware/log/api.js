/**
 * @author synder on 2017/3/30
 * @copyright
 * @desc
 */



module.exports = function () {
    return function (req, res, next) {
        let start = Date.now();
        let end = res.end;

        res.end = function () {
            let dataFrom = res.get('X-Data-From') || 'local';
            console.info(req.method, req.path, Date.now() - start, 'from:' + dataFrom);
            end.apply(res, arguments);
        };

        next();
    };
};