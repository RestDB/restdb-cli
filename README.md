# restdb-cli

Command line tool for restdb.io database applications.

Install:
```
$ npm install restdb-cli -g
```

Usage:
```
$ restdb-cli <arguments>
```

Arguments

  help:          Display help information about restdb-cli.                        
  apikey:        Full access api-key to your restdb.io server.
  database:      Database name.                   
  deploy:        Deploy folder (recursive) to restdb.io server.                    
  destination:   Destination folder for deployment folder at the restdb.io server.

Example:
  ```
  $ restdb-cli --deploy ./dist --destination /myapp --database mydatabase-ffe0 --apikey 234r23479x73098n2453987d324
  ```
