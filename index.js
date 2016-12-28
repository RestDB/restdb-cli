#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const sections = [
  {
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
  }
]

const usage = getUsage(sections)

const optionDefinitions = [
  { name: 'cmd', default: 'upload' },
  { name: 'help' },
  { name: 'apikey' },
  { name: 'database'},
  { name: 'src'},
  { name: 'dest'}
]
const options = commandLineArgs(optionDefinitions);
var isEmpty = (Object.keys(options).length === 0 && options.constructor === Object);

//console.log(options, isEmpty);

if (options.help || isEmpty) {
  console.log(usage);
  return;
}

if (options.cmd && options.cmd === 'upload') {
  require('./deploy_cmd').run(options);
} else {
  console.log(options.cmd, " id not a valid command");
}
