
const restify = require("restify")

const fs = require('fs')
var multer = require('multer');
var JavaScriptObfuscator = require("javascript-obfuscator");

var path = require('path');



var server = restify.createServer();
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.listen(process.env.port || process.env.PORT || 3817, function () {
    console.log('%s listening to %s', server.name, server.url);
});

server.post('/uploadfile', (req, resp) => {
	if(req.files){
	  for (var key in req.files) {
	    if (req.files.hasOwnProperty(key)) {
	    	fs.renameSync(req.files[key].path, `./uploads/ ${req.files[key].name}`);
	      	//fs.unlink(req.files[key].path);			
	    }
	  }
		resp.send(202, { message: 'File uploaded' });
	}
});


/* SERVICE OFUSCAR TEXT*/
server.post('/ofuscarcodigo', (req, res) => {
     try{
       // console.log(req.params.codigo)
        var obfuscationResult;
        if(req.params.codigo){
            obfuscationResult = JavaScriptObfuscator.obfuscate(req.params.codigo,
                {
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1,
                    debugProtection: true,
                    debugProtectionInterval: true,
                    disableConsoleOutput: true,
                    log: false,
                    mangle: false,
                    renameGlobals: false,
                    rotateStringArray: true,
                    selfDefending: true,
                    stringArray: true,
                    stringArrayEncoding: 'rc4',
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: false
                }
            );
            res.send({ code: obfuscationResult.getObfuscatedCode() });
        }
    }catch(e){
        res.send({ error: e });
    }
});

server.post('/obfuscate', (req, resp) => {
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
                    if(r.length == files.length){ 
                        r.filter((m) => {return m;}); 
                        for(var i in r){ updateFile(r[i].f); }
                    }
                });
            }
        });
    });
	resp.send(202, { message: 'File obfuscated' });
});



function updateFile(file){
    console.log("file: "+file+", "+file.split(".")[1])
    if(file.split(".")[1] == "js"){
        fs.readFile(__dirname + '/uploads/'+file, "UTF-8", function(err, data){
            console.log("Read file: "+ file)
            if(err){ console.log("error"); throw err; }
            var obfuscationResult = JavaScriptObfuscator.obfuscate(data,
                {
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1,
                    debugProtection: true,
                    debugProtectionInterval: true,
                    disableConsoleOutput: true,
                    log: false,
                    mangle: false,
                    renameGlobals: false,
                    rotateStringArray: true,
                    selfDefending: true,
                    stringArray: true,
                    stringArrayEncoding: 'rc4',
                    stringArrayThreshold: 1,
                    unicodeEscapeSequence: false
                }
            );
            fs.writeFile(__dirname + "/uploads/"+file, obfuscationResult.getObfuscatedCode(), function(err){
                if(err){ return console.log(err); }
                console.log("the file "+file+" was saved!");
            });
        });
    }
}




server.get('/downloadFile', function (req, res) {

   var file = path.join(__dirname, 'pasaje.pdf');
    var filePath = "/pasaje.pdf";

    fs.readFile(__dirname + filePath , function (err,data){
        //res.contentType("application/pdf");
        res.setHeader('content-type','application/pdf')
        res.send(data);
    });

});



server.post('/fileobfuscated', (req, res) => {

        res.setHeader('content-type','application/js')
        res.writeHead(200);
        res.write(getFile("base.js"));
        res.end();


    /*
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
                    if(r.length == files.length){ 
                        r.filter((m) => {return m;}); 
                        for(var i in r){ 
                            console.log("file readed: "+ r[i].f);
                            getFile(r[i].f);
                            /*
                            fs.readFile(__dirname + '/uploads/base.js', "UTF-8", function(err, data){
                                console.log("Read file2: ")
                                if(err){ console.log("error"); throw err; }
                                res.send({
                                  code: 200,
                                  noEnd: true
                                });
                                res.write(data);
                                res.end();
                            });
                            */
                            /*
                        }
                    }
                });
            }
        });
    });
*/

});


function getFile(file){

    var filex = "";




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


                    if(r.length == files.length){ 
                        r.filter((m) => {return m;}); 
                        for(var i in r){ 
                            console.log("file readed: "+ r[i].f);

                            if(r[i].f.split(".")[1] == "js"){
                                console.log("if " + r[i].f.split(".")[1])
                                // fs.readFile(__dirname + '/uploads/base.js', "UTF-8", function(err, data){
                                //     console.log("Read file2: "+ r[i].f)
                                //     if(err){ console.log("error"); throw err; }
                                //     filex = data;
                                // });
                            }
                        }
                    }

                });
            }
        });
    });


    fs.readFile(__dirname + '/uploads/base.js', "UTF-8", function(err, data){
        console.log("Read file2: ")
        if(err){ console.log("error"); throw err; }
        filex = data;
    });






    return filex;

}







