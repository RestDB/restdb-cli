#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const sections = [{
        header: 'restdb.io - Plug And Play Database service',
        content: 'Command line tool for restdb.io database applications.'
    },
    {
        header: 'Synopsis',
        content: '$ restdb-cli --cmd <command> <arguments>'
    },
    {
        header: 'Command list'
    },
    {
        header: 'upload',
        content: [
            { name: '--apikey', summary: 'Full access apikey to your restdb.io server.' },
            { name: '--database', summary: 'Database name, e.g. mydatabase-ffe0' },
            { name: '--src', summary: 'Deploy local folder (recursive) to restdb.io server.' },
            { name: '--dest', summary: 'Destination folder for deployment folder at the restdb.io server.' }
        ]
    },
    {
        header: 'example',
        content: 'restdb-cli --cmd upload --src dist --dest app --database mydb-xfg3 --apikey xxx'
    },
    {
        header: 'clean',
        content: [
            { name: '--apikey', summary: 'Full access apikey to your restdb.io server.' },
            { name: '--database', summary: 'Database name, e.g. mydatabase-ffe0' }
        ]
    },
    {
        header: 'download',
        content: [
            { name: '--apikey', summary: 'Full access apikey to your restdb.io server.' },
            { name: '--database', summary: 'Database name, e.g. mydatabase-ffe0' }
        ]
    }
]

const usage = getUsage(sections)

const optionDefinitions = [
    { name: 'cmd' },
    { name: 'help' },
    { name: 'apikey' },
    { name: 'database' },
    { name: 'src' },
    { name: 'dest', defaultValue: "." }
]

var options = null;
try {
    options = commandLineArgs(optionDefinitions);
} catch (error) {
    console.log(error.message);
    return;
}

var isEmpty = (Object.keys(options).length === 0 && options.constructor === Object);

//console.log(options, isEmpty);

if (options.help || isEmpty) {
    console.log(usage);
    return;
}

switch (options.cmd) {
    case 'upload':
        require('./deploy_cmd').run(options);
        break;
    case 'clean':
        require('./clean_cmd').run(options);
    case 'download':
        require('./download_cmd').run(options);
    case undefined:
        console.log("Missing command parameter: --cmd");
        break;
    default:
        console.log("Unknown command: " + options.cmd);
        break;
}