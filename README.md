# restdb-cli

Command line tool for restdb.io database applications.

Install:
```
$ npm install restdb-cli -g
```

Usage:
```
$ restdb-cli <command> <arguments>
```

Commands:

## upload

Copy all files and folders from a local directory to server


Arguments:
| arguments | description |
| -- | -- |
| --apikey | Full access api-key to your restdb.io server |
| --database | Database name |
| --src | Deploy folder (recursive) to restdb.io server |
| --dest | Destination folder for deployment folder at the restdb.io server |

Example:
  ```
  $ restdb-cli --cmd upload --src ./dist --dest /myapp --database mydatabase-ffe0 --apikey 234r23479x73098n2453987d324
  ```
