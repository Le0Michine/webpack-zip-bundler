# webpack-zip-bundler

A plugin for packaging assets into a zip archive. It is based on JSZip library https://stuk.github.io/jszip.

Installation

```
npm install --save-dev webpack-zip-bundler
```

Usage
```javascript
const ZipBundlerPlugin = require('webpack-zip-bundler');

...

// add to webpack plugins array
plugins: [
  new ZipBundlerPlugin(options)
]

/*
  options: {
    out: string, output file name, 'out.zip' by default
    regex: Regex, regex to filter assets by their names
  }
*/
```