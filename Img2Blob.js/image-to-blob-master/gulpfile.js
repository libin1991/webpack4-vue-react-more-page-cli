var gulp = require( 'gulp' ),
    browserify = require( 'gulp-browserify' ),
    rename = require( 'gulp-rename' ),
    debug = require( 'gulp-debug' ),
    uglify = require( 'gulp-uglify' );

gulp.task( 'build', function ( ) {
    gulp.src( './index.js' )
        // .pipe( debug( { verbose: true } ) )
        .pipe( browserify( {
            debug: true
        } ) )
        .pipe( rename( 'image-to-blob.js' ) )
        .pipe( gulp.dest( './dist' ) );
} );

gulp.task( 'compress', function ( ) {
    
    gulp.src( './index.js' )
        // .pipe( debug( { verbose: true } ) )
        .pipe( browserify( {
            debug: false
        } ) )
        .pipe( uglify() )
        .pipe( rename( 'image-to-blob.min.js') )
        .pipe( gulp.dest( './dist' ) );
} );

gulp.task( 'examples', function ( ) {
    
    gulp.src( './examples/index.js' )
        // .pipe( debug( { verbose: true } ) )
        .pipe( browserify( {
            debug: true
        } ) )
        .pipe( rename( 'bundle.js') )
        .pipe( gulp.dest( './examples' ) );
} );

gulp.task( 'default', [ 'build', 'compress', 'examples' ] );