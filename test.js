
// Require the Obfuscator Module
var JavaScriptObfuscator = require('javascript-obfuscator');



console.log(process.cwd())


const fs = require('fs');
var content;
// First I want to read the file
fs.readFile('./base.js', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)
    processFile();          // Or put the next step in a function and invoke it
});

function processFile() {
    console.log(content);
}




/*
// Read the file of your original JavaScript Code as text
fs.readFileSync(path.join(__dirname, '../uploads') + '/base.js', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }

    // Obfuscate content of the JS file
    var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
    
    // Write the obfuscated code into a new file
    fs.writeFile('./your-code-obfuscated.js', obfuscationResult.getObfuscatedCode() , function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
});
*/

/*
var fs = require('fs');
var path = require('path');
var readStream = fs.createReadStream(path.join(__dirname, '../uploads') + '/base.js', 'utf8');
let data = ''
readStream.on('data', function(chunk) {
    data += chunk;
}).on('end', function() {
    console.log(data);
});
*/