# Metalsmith Simple Includes

A very simple [Metalsmith](http://metalsmith.io) plugin that allows content to be included with a directive.

## Installation

```bash
npm install --save-dev metalsmith-simple-includes
```

## Usage

### JavaScript

```js
const includes = require( 'metalsmith-simple-includes' );

Metalsmith( __dirname )
    .use( includes( {
        directive: '^#include <(.*?)>', // default include directive pattern
        directory: '',                  // default includes directory
        pattern: '*.html'               // default file pattern to process for include directives
    } ) )
    .build( error => {
        if ( error ) {
            console.error( error )
        }
    } );
```

```md
#include <path/to/file.ext>
```

### metalsmith.json

```json
{
  "plugins": {
    "metalsmith-simple-includes": {
      "directive": "^#include <(.*?)>",
      "directory": "",
      "pattern": "*.html"
    }
  }
}
```

## Options

- `directive` is the regular expression for the include directive
- `directory` is the base directory for your included files
- `pattern` is a glob pattern for filenames to process for include directives

## License

The MIT License (MIT)

## Thanks

This plugin was developed at Oportun, Inc.