<h1 align="center">Odonata</h1>
<p align="center"><img src="http://www.ferecord.com/wp-content/uploads/2019/02/odonata-icon.png" alt="Odonata" width="80"></p>
<p align="center">🎉 CLI tool and lib to gather performance metrics </p>

----

## Install
```bash
npm i odonata -g

# or use local packages
# npm i odonata --save
```

## Output

![Odonata](http://www.ferecord.com/wp-content/uploads/2019/02/odonata-cli-screenshot.png)

## Usage

### CLI
```bash
odonata http://baidu.com

# or use with `npx`:
# npm i odonata --save
# npx odonata http://baidu.com
```

### Node
```js
const odonata = require('odonata');

odonata({url: 'http://baidu.com', ua: 'mobile'})
    .then(data => console.log(data));
```


### Help
```
╰─ odonata
Usage: odonata [options] [url]

CLI tool and lib to gather performance metrics

Options:
  -V, --version  output the version number
  -u, --ua <u>   use mobile or desktop ua (default: "mobile")
  -h, --help     output usage information

Examples:
  $ odonata http://baidu.com
  $ odonata -ua desktop http://baidu.com
```

## Contact
 - Mail: menghui9898@gmail.com
 - Twitter: [@Tumars](https://twitter.com/Tumars)


## License
MIT