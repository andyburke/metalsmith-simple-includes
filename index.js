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

    return ( files, metalsmith, done ) => {

        const includes_cache = {};

        function include( path ) {
            if ( includes_cache[ path ] ) {
                return includes_cache[ path ];
            }

            const absolute_path = metalsmith.path( options.directory, path );

            const contents = fs.readFileSync( absolute_path ).toString( 'utf8' );
            const resolved = contents.replace( include_directive, ( match, include_path ) => {
                return include( include_path );
            } );

            includes_cache[ path ] = resolved;
            return includes_cache[ path ];
        }

        Object.keys( files )
            .filter( filename => match( filename, options.pattern ) )
            .forEach( filename => {
                const file = files[ filename ];
                file.contents = file.contents.toString().replace( include_directive, ( match, path ) => {
                    return include( path );
                } );
            } );

        done();
    };
};