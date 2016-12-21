// require modules
var fs = require('fs');
var archiver = require('archiver');
var request = require('request');

exports.run = function(options){
  // create a file to stream archive data to.
  var zipfile = __dirname + '/tmpfile.zip';
  var dest = options.destination;
  var dbname = options.database;
  var apikey = options.apikey;
  var deploy = options.deploy;
  var output = fs.createWriteStream(zipfile);
  var archive = archiver('zip', {
      store: true // Sets the compression method to STORE.
  });

  // listen for all archive data to be written
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    var zipstream = fs.createReadStream(zipfile);

    request.post(
      { url:'https://'+dbname+'.restdb.io/appdeploy/'+dest,
        rejectUnauthorized: false,
        headers:{ 'x-apikey': apikey,
                  'Content-Type':'application/octet-stream'},
        body: zipstream
      }, function optionalCallback(err, httpResponse, body) {
        fs.unlinkSync(zipfile);
        if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
        }
      );
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  // append files from a directory
  archive.directory(deploy);

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  archive.finalize();
}
