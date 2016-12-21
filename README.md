# restdb-cli

Command line tool for restdb.io database applications.

Install:
```
$ npm install restdb-cli -g
```

Usage:
```
$ restdb-cli <options> <command>
```

Command List

  help          Display help information about restdb-cli.                        
  apikey        Full access api-key to your restdb.io server.
  database      Database name.                   
  deploy        Deploy folder (recursive) to restdb.io server.                    
  destination   Destination folder for deployment folder at the restdb.io server.

Example:
  ```
  $ restdb-cli --deploy ./myapp --destination /myapp --database mydatabase-xyzf
  ```
