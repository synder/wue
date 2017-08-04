/**
 * @author synder on 2017/7/26
 * @copyright
 * @desc
 */

exports.get = function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    
    setTimeout(function () {
        res.json({
            ok: true,
            num: 1,
            str: 'name',
            obj: {
                name: 'sam'
            },
            arr: [
                'name'
            ]
        });
    }, 100);
};

exports.del = function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    res.json({
        ok: true,
        num: 1,
        str: 'name',
        obj: {
            name: 'sam'
        },
        arr: [
            'name'
        ]
    });
};

exports.post = function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    res.json({
        ok: true,
        num: 1,
        str: 'name',
        obj: {
            name: 'sam'
        },
        arr: [
            'name'
        ]
    });
};

exports.put = function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    res.json({
        ok: true,
        num: 1,
        str: 'name',
        obj: {
            name: 'sam'
        },
        arr: [
            'name'
        ]
    });
};

exports.show = function (req, res, next) {
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
   console.log('ok');
};