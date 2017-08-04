/**
 * @author synder on 2017/8/4
 * @copyright
 * @desc
 */


const ajax = require('../../controller/demo/ajax');
const upload = require('../../controller/demo/upload');

exports.mount = function (app) {
    app.post('/upload', upload.batch);
    app.get('/ajax', ajax.get);
    app.delete('/ajax', ajax.del);
    app.post('/ajax', ajax.post);
    app.put('/ajax', ajax.put);
};