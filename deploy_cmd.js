// require modules
var fs = require('fs');
var archiver = require('archiver');
var request = require('request');
var tmp = require('tmp');

exports.run = function(options) {
    // create a file to stream archive data to.
    options = options || {};
    var zipfile = tmp.tmpNameSync();

    var errors = false;
    if (!options.database) {
        console.log("Missing required parameter --database");
        errors = true;
    }
    if (!options.apikey) {
        console.log("Missing required parameter --apikey");
        errors = true;
    }
    if (!options.src) {
        console.log("Missing required parameter --src");
        errors = true;
    }
    if (errors) return;

    var output = fs.createWriteStream(zipfile);
    var archive = archiver('zip', {
        store: true // Sets the compression method to STORE.
    });

    // listen for all archive data to be written
    output.on('close', function() {
        var zipstream = fs.createReadStream(zipfile);
        request.post({
            url: 'https://' + options.database + '.restdb.io/appdeploy/' + options.dest,
            rejectUnauthorized: false,
            headers: {
                'x-apikey': options.apikey,
                'Content-Type': 'application/octet-stream'
            },
            body: zipstream
        }, function optionalCallback(err, httpResponse, body) {
            fs.unlinkSync(zipfile);
            if (err || httpResponse.statusCode !== 200) {
                var message = err && err.message ? err.message : "";
                if (httpResponse.statusCode === 403) {
                    message += " no access"
                }
                if (httpResponse.statusCode === 503) {
                    message += " database not found"
                }
                return console.error('Upload failed:', httpResponse.statusCode, message, err);
            } else {
                console.log("\nUpload successful!  " + archive.pointer() + " total bytes uploaded");
            }
        });
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
        console.log("Unable to package files for upload " + err.message);
    });

    // pipe archive data to the file
    archive.pipe(output);
    // append files from a directory
    archive.directory(options.src);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();
}