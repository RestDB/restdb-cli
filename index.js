const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');

const sections = [
  {
    header: 'restdb.io - Plug And Play Database service',
    content: 'Command line tool for restdb.io database applications.'
  },
  {
    header: 'restdb-cli',
    content: '$ restdb-cli <options> <command>'
  },
  {
    header: 'Command List',
    content: [
      { name: 'help', summary: 'Display help information about restdb-cli.' },
      { name: 'apikey', summary: 'Full access apikey to your restdb.io server.' },
      { name: 'database', summary: 'Database name, e.g. mydatabase-ffe0' },
      { name: 'deploy', summary: 'Deploy folder (recursive) to restdb.io server.' },
      { name: 'destination', summary: 'Destination folder for deployment folder at the restdb.io server.' }
    ]
  }
]

const usage = getUsage(sections)

const optionDefinitions = [
  { name: 'help' },
  { name: 'apikey' },
  { name: 'database', alias: 'n'},
  { name: 'deploy', alias: 'd'},
  { name: 'destination', alias: 'r'}
]
const options = commandLineArgs(optionDefinitions);
var isEmpty = (Object.keys(options).length === 0 && options.constructor === Object);
console.log(options, isEmpty);
if (options.help || isEmpty) {
  console.log(usage);
  return;
}

if (options.deploy) {
  require('./deploy_cmd').run(options);
}
