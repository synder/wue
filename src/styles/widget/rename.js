/**
 * @author synder on 2017/8/17
 * @copyright
 * @desc
 */


const fs = require("fs");
const path = require("path");

function readDirSync(base, name){
    
    base = path.join(base, name);
    
    let files = fs.readdirSync(base);

    files.forEach(function(file){
        
        let pth = path.join(base, file);
        let info = fs.statSync(pth);

        if(info.isDirectory()){
            readDirSync(pth, '');
        }else{
           
            fs.renameSync(pth, pth.replace('', ''));
        }
    })
}

readDirSync(path.join(__dirname,'./') , '');