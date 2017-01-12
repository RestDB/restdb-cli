// require modules
var fs = require('fs');
var request = require('request');

/*
var request = require('request'),
fs = require('fs');

var url2 = 'http://l4.yimg.com/nn/fp/rsz/112113/images/smush/aaroncarter_635x250_1385060042.jpg';

var r = request(url2);

r.on('response',  function (res) {
  res.pipe(fs.createWriteStream('./' + res.headers.date + '.' + res.headers['content-type'].split('/')[1]));

});
*/

exports.run = function(options) {
    // create a file to stream archive data to.
    var dest = options.dest || "";
    var dbname = options.database;
    var apikey = options.apikey;

    var opt = {
        method: 'GET',
        rejectUnauthorized : false,
        headers : {
            "x-apikey": apikey
        },
        url: 'https://' + dbname + '.restdb.io/appdeploy'
    };
    var r = request(opt);
    r.on('error',  function () {
        console.log(arguments);
    });
    r.on('response',  function (res) {
        
        var filename = dbname+".zip";
        res.pipe(fs.createWriteStream('./' + filename));
        console.log("Download done");
    });
}