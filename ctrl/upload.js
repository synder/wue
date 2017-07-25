/**
 * @author synder on 2017/7/24
 * @copyright
 * @desc
 */

/**
 * @author synder on 2017/3/13
 * @copyright
 * @desc
 */

const fs = require('fs');
const url = require('url');
const path = require('path');
const formidable = require('formidable');

/**
 * @desc 批量上传接口
 * */
exports.batch = function (req, res, next) {
    let contentLength = req.headers['content-length'];

    if (contentLength < 1) {
        return next(new Error('request entity too small'));
    }

    if (contentLength > 10485760) {
        return next(new Error('request entity too large'));
    }

    const form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.maxFieldsSize = 1024;
    form.multiples = true;
    form.maxFields = 10;

    let filename = '';

    form.onPart = function (stream) {
        let self = this;

        let name = stream.name;
        filename = stream.filename;
        let filemime = stream.mime;
        
        if (!filename) {
            return;
        }
        
        if(filemime.indexOf('image') < 0){
            return;
        }

        self._flushing++;
        
        let writeStream = fs.createWriteStream(path.join(__dirname, '../static/upload', filename));

        writeStream.on('close', function () {
            self._flushing--;
            self._maybeEnd();
        });

        writeStream.on('error', function (error) {
            console.error(error);
            self._flushing--;
            self._maybeEnd();
        });
        
        stream.pipe(writeStream);
    };

    form
        .on('error', function (err) {
            return next(err);
        })
        .on('end', function () {
            res.json('/upload/' + filename);
        })
        .parse(req);
};