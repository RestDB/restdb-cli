// require modules
var fs = require('fs');
var request = require('request');

exports.run = function(options) {
    // create a file to stream archive data to.
    var dest = options.dest || "*";
    var dbname = options.database;
    var apikey = options.apikey;

    request.delete({
        url: 'https://' + dbname + '.restdb.io/appdeploy/' + dest,
        rejectUnauthorized: false,
        headers: {
            'x-apikey': apikey
        }
    }, function optionalCallback(err, httpResponse, body) {
        if (err || httpResponse.statusCode !== 200) {
            var message = err && err.message ? err.message : httpResponse.statusCode;
            return console.error('Clean failed ', message);
        } else {
            console.log('Clean successful!');
        }
    });
}