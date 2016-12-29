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

Copy all files and folders from a local directory to server

| argument | description |
| :-- | :-- |
| --apikey | Full access api-key to your restdb.io database |
| --database | Database name |
| --src | Deploy folder (recursive) to restdb.io server |
| --dest | Destination folder for deployment folder at the restdb.io server |

Example:
  ```
  $ restdb-cli --cmd upload --src ./dist --dest /myapp --database mydatabase-ffe0 --apikey 234r23479x73098n2453987d324

  Files will be served under https://mydatabase-ffe0.restdb.io/static/myapp
  ```
