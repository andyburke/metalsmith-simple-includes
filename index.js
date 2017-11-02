const extend = require( 'extend' );
const fs = require( 'fs' );
const match = require( 'minimatch' );

/**
 * @param {Object} options
 * @param {String} options.directive is the pattern for the include directive, default: '^#include <(.*?)>'
 * @param {String} options.directory is the default includes directory
 * @param {String} options.pattern is the glob pattern for matching files to process, default: *.html
 */
module.exports = function( _options ) {
    const options = extend( {
        directive: '^#include <(.*?)>',
        directory: '',
        pattern: '*.html'
    }, _options );

    const include_directive = new RegExp( options.directive, 'gmi' );

    const includes_cache = {};

    return ( files, metalsmith, done ) => {
        Object.keys( files ).filter( filename => match( filename, options.pattern ) ).forEach( filename => {
            const file = files[ filename ];
            file.contents = file.contents.toString().replace( include_directive, ( match, path ) => {
                const absolute_path = metalsmith.path( options.directory, path );
                includes_cache[ path ] = includes_cache[ path ] || fs.readFileSync( absolute_path ).toString( 'utf8' );
                return includes_cache[ path ];
            } );
        } );

        done();
    };
};