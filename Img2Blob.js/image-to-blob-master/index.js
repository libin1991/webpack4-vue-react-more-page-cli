
/* global unescape */

'use strict';

var imageToUri = require( 'image-to-data-uri' );

/*
## Image to blob
----------------------------------------------------------------------
Converts remote image urls to blobs via canvas. 

```javascript
var imageToBlob = require( 'image-to-blob' );

imageToBlob( 'http://foo.bar/baz.png', function( err, uri ) { 
    console.log( uri ); 
} );
imageToBlob( document.getElementsByTagName( 'img' )[ 0 ], function( err, uri ) { 
    console.log( uri ); 
} );
```
*/

var types = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'svg': 'image/svg+xml' // this gets converted to png
};

module.exports = imageToBlob;
module.exports.dataURItoBlob = dataURItoBlob;
module.exports._handleImageToURI = handleImageToURI;
module.exports.getMimeTypeFromUrl = getType;

/*
    imageToBlob - main function that gets exposed, converts either dom node or url of image into blob data

    params
        img { Object | String } - either can be an IMG DOM node or a url string that will load the image
        options { Object } - optional, a set of options that you can pass to the imagetoblob to change the behavior
        callback { Function } - a function to be called after the conversion is completed. The callback will get passed an error ( if one occures ) and the blob.

*/

function imageToBlob( img, options, callback ) {
    
    var src;

    if ( typeof options === 'function' ) {
        callback = options;
        options = {};
    }

    options = options || {};

    if ( !img ) {
        return callback( new Error( 'Pass in a IMG DOM node or a url as first param' ) );
    }

    if ( typeof img === 'object' && img.tagName.toLowerCase() === 'img' ) {
        src = img.src;
    }

    if ( typeof img === 'string' ) {
        src = img;
    }

    if ( /^data:/.test( src ) && !options.convert ) { // check to see if its a data uri
        callback( null, dataURItoBlob( src ) ); // script to datauri conversion
        return;
    }

    options.type = types[ options.type ] || getType( src );
    options.src = src;
    options.callback = callback;
    if ( !options.type ) {

        callback( new Error( 'Image type is not supported' ) );
        return;
    }

    imageToUri( src, options.type, handleImageToURI.bind( null, options ) ); // attempt if we have a 
}

/*
    dataURItoBlob - takes a datauri and converts it into a blob

    params
        uri { String } - a valid datauri

    returns
        blob { Blob Object } - generated blob object

*/


function dataURItoBlob( uri ) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString,
        mimeString,
        ia;

    if ( uri.split( ',' )[0].indexOf( 'base64' ) >= 0 ) {

        byteString = atob( uri.split(',')[1] );
    }
    else {

        byteString = unescape( uri.split(',')[1] );
    }

    // separate out the mime component
    mimeString = uri.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];

    // write the bytes of the string to a typed array
    ia = new Uint8Array( byteString.length );

    for ( var i = 0; i < byteString.length; i++ ) {
        
        ia[ i ] = byteString.charCodeAt( i );
    }

    return new Blob( [ ia ], {
        type: mimeString
    } );
}

/*
    handleImageToURI - handles a callback from imageToURI and glues together dataURItoBlob

    params
        options { Object } - the options object passed to the main fn with the callback attached to it
        err { Error Object } - an error if one occurs in the imageToURI method 
        uri { String } - a valid data url

*/

function handleImageToURI( options, err, uri ) {

    if ( err ) {
        options.callback( err );
        return;
    }

    options.callback( null, dataURItoBlob( uri ) );

}

/*
    getType - small util to get type from url if one is present in types list

    params
        url { String } - a url to parse the file extension from

    returns
        type { String } - a mime type if type is supported, if not undefined is returned

*/

function getType( url ) {
    return url ? types[ url.split( '?' ).shift( ).split( '.' ).pop( ) ] : null ;
}
