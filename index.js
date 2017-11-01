const fs = require( 'fs' );
const extend = require( 'extend' );

/**
 * @param {Object} options
 * @param {String} options.pattern is the pattern for the include directive, default: '^#include <(.*?)>'
 * @param {String} options.directory is the default includes directory
 */
module.exports = function( _options ) {
    const options = extend( {
        pattern: '^#include <(.*?)>',
        directory: ''
    }, _options );

    const include_expression = new RegExp( options.pattern, 'gmi' );

    const includes_cache = {};

    return ( files, metalsmith, done ) => {
        Object.values( files ).forEach( file => {
            file.contents = file.contents.toString().replace( include_expression, ( match, path ) => {
                const absolute_path = metalsmith.path( options.directory, path );
                includes_cache[ path ] = includes_cache[ path ] || fs.readFileSync( absolute_path ).toString( 'utf8' );
                return includes_cache[ path ];
            } );
        } );

        done();
    };
};