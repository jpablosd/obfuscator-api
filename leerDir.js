var fs = require('fs');
var path = require('path');
 

 
var dir = './uploads';

fs.readdir(dir, (err, files) => {
    var r = [];
    files.forEach((file) => {
        s(file);
        function s(file){
            fs.stat(dir + '/' + file, (err, stat) => {
                if(err){console.error(err);return;}
                if(stat.isDirectory())r.push({f:file, type: 'dir'});
                else if(stat.isFile())r.push({f:file, type: 'file'});
                else r.push(0);
                if(r.length == files.length){ r.filter((m) => {return m;}); }
            });
        }
    });
});