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
        pattern: '^#include <(.*?)>', // default include directive pattern
        directory: ''                 // default includes directory
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
      "pattern": "^#include <(.*?)>",
      "directory": ""
    }
  }
}
```

## Options

- `pattern` is the regular expression for the include directive
- `directory` is the base directory for your included files

## License

The MIT License (MIT)

## Thanks

This plugin was developed at Oportun, Inc.