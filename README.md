# restdb-cli

Command line tool for [restdb.io](https://restdb.io) database applications.

Install:
```
$ npm install restdb-cli -g
```

Usage:
```
$ restdb-cli --cmd <command> [<arguments> ...]
```

Commands:

## upload

Copy all files and folders from a local directory to restdb.io database static file area

| argument | description |
| :-- | :-- |
| --apikey | Full access api-key |
| --database | Database name |
| --src |  Folder to deploy (recursive) |
| --dest | Destination folder (default is '.') |

Example:
  ```
  $ restdb-cli --cmd upload --src ./dist --dest /myapp --database mydatabase-ffe0 --apikey 234r23479x73098n2453987d324

  Files will be served under https://mydatabase-ffe0.restdb.io/static/myapp or https://mydatabase-ffe0.restdb.io/static if --dest is '.' or not given.
  ```

## clean

Remove all static files and folders from database

| argument | description |
| :-- | :-- |
| --apikey | Full access api-key |
| --database | Database name |
