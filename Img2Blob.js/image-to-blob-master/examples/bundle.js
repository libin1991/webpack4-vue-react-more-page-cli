(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var imageToBlob = require( '../' ),
    sloth = document.getElementById( 'sloth' ),
    html = document.getElementById( 'htmltest' ).outerHTML,
    DOMURL = window.URL || window.webkitURL || window;

function appendBlob( err, blob ) {
    if ( err ) {
        console.error( err );
        return;
    }

    console.log( blob );

    var img = document.createElement( 'img' );

    img.src = DOMURL.createObjectURL( blob );

    document.body.appendChild( img );    
}

imageToBlob( sloth, appendBlob );
imageToBlob( './hello.svg', appendBlob );
},{"../":2}],2:[function(require,module,exports){

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
module.exports.handleImageToURI = handleImageToURI;
module.exports.getMimeTypeFromUrl = getType;

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


    options.type = types[ options.type ] || getType( src );
    options.src = src;
    options.callback = callback;
    if ( !options.type ) {

        callback( new Error( 'Image type is not supported' ) );
        return;
    }

    imageToUri( src, options.type, handleImageToURI.bind( null, options ) ); // attempt if we have a 
}

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

function handleImageToURI( options, err, uri ) {

    if ( err ) {
        options.callback( err );
        return;
    }

    options.callback( null, dataURItoBlob( uri ) );

}

function getType( url ) {
    return types[ url.split( '?' ).shift( ).split( '.' ).pop( ) ];
}

},{"image-to-data-uri":3}],3:[function(require,module,exports){
// converts a URL of an image into a dataURI
module.exports = function (url, mimeType, cb) {
    // Create an empty canvas and image elements
    var canvas = document.createElement('canvas'),
        img = document.createElement('img');

    if ( typeof mimeType === 'function' ) {
        cb = mimeType;
        mimeType = null;
    }

    mimeType = mimeType || 'image/png';

    // allow for cross origin that has correct headers
    img.crossOrigin = "Anonymous"; 

    img.onload = function () {
        var ctx = canvas.getContext('2d');
        // match size of image
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        ctx.drawImage(img, 0, 0);

        // Get the data-URI formatted image
        cb( null, canvas.toDataURL( mimeType ) );
    };

    img.onerror = function () {
        cb(new Error('FailedToLoadImage'));
    };

    // canvas is not supported
    if (!canvas.getContext) {
        cb(new Error('CanvasIsNotSupported'));
    } else {
        img.src = url;
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2phY29iL1Byb2plY3RzL0hvbmUvaW1hZ2UtdG8tYmxvYi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qYWNvYi9Qcm9qZWN0cy9Ib25lL2ltYWdlLXRvLWJsb2IvZXhhbXBsZXMvZmFrZV9iZWI2MDZmNy5qcyIsIi9ob21lL2phY29iL1Byb2plY3RzL0hvbmUvaW1hZ2UtdG8tYmxvYi9pbmRleC5qcyIsIi9ob21lL2phY29iL1Byb2plY3RzL0hvbmUvaW1hZ2UtdG8tYmxvYi9ub2RlX21vZHVsZXMvaW1hZ2UtdG8tZGF0YS11cmkvaW1hZ2UtdG8tZGF0YS11cmkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIGltYWdlVG9CbG9iID0gcmVxdWlyZSggJy4uLycgKSxcbiAgICBzbG90aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnc2xvdGgnICksXG4gICAgaHRtbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnaHRtbHRlc3QnICkub3V0ZXJIVE1MLFxuICAgIERPTVVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XG5cbmZ1bmN0aW9uIGFwcGVuZEJsb2IoIGVyciwgYmxvYiApIHtcbiAgICBpZiAoIGVyciApIHtcbiAgICAgICAgY29uc29sZS5lcnJvciggZXJyICk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyggYmxvYiApO1xuXG4gICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbWcnICk7XG5cbiAgICBpbWcuc3JjID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTCggYmxvYiApO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggaW1nICk7ICAgIFxufVxuXG5pbWFnZVRvQmxvYiggc2xvdGgsIGFwcGVuZEJsb2IgKTtcbmltYWdlVG9CbG9iKCAnLi9oZWxsby5zdmcnLCBhcHBlbmRCbG9iICk7IiwiXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbWFnZVRvVXJpID0gcmVxdWlyZSggJ2ltYWdlLXRvLWRhdGEtdXJpJyApO1xuXG4vKlxuIyMgSW1hZ2UgdG8gYmxvYlxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuQ29udmVydHMgcmVtb3RlIGltYWdlIHVybHMgdG8gYmxvYnMgdmlhIGNhbnZhcy4gXG5cbmBgYGphdmFzY3JpcHRcbnZhciBpbWFnZVRvQmxvYiA9IHJlcXVpcmUoICdpbWFnZS10by1ibG9iJyApO1xuXG5pbWFnZVRvQmxvYiggJ2h0dHA6Ly9mb28uYmFyL2Jhei5wbmcnLCBmdW5jdGlvbiggZXJyLCB1cmkgKSB7IFxuICAgIGNvbnNvbGUubG9nKCB1cmkgKTsgXG59ICk7XG5pbWFnZVRvQmxvYiggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICdpbWcnIClbIDAgXSwgZnVuY3Rpb24oIGVyciwgdXJpICkgeyBcbiAgICBjb25zb2xlLmxvZyggdXJpICk7IFxufSApO1xuYGBgXG4qL1xuXG52YXIgdHlwZXMgPSB7XG4gICAgJ3BuZyc6ICdpbWFnZS9wbmcnLFxuICAgICdqcGcnOiAnaW1hZ2UvanBlZycsXG4gICAgJ2pwZWcnOiAnaW1hZ2UvanBlZycsXG4gICAgJ3N2Zyc6ICdpbWFnZS9zdmcreG1sJyAvLyB0aGlzIGdldHMgY29udmVydGVkIHRvIHBuZ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbWFnZVRvQmxvYjtcbm1vZHVsZS5leHBvcnRzLmRhdGFVUkl0b0Jsb2IgPSBkYXRhVVJJdG9CbG9iO1xubW9kdWxlLmV4cG9ydHMuaGFuZGxlSW1hZ2VUb1VSSSA9IGhhbmRsZUltYWdlVG9VUkk7XG5tb2R1bGUuZXhwb3J0cy5nZXRNaW1lVHlwZUZyb21VcmwgPSBnZXRUeXBlO1xuXG5mdW5jdGlvbiBpbWFnZVRvQmxvYiggaW1nLCBvcHRpb25zLCBjYWxsYmFjayApIHtcbiAgICBcbiAgICB2YXIgc3JjO1xuXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZiAoICFpbWcgKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayggbmV3IEVycm9yKCAnUGFzcyBpbiBhIElNRyBET00gbm9kZSBvciBhIHVybCBhcyBmaXJzdCBwYXJhbScgKSApO1xuICAgIH1cblxuICAgIGlmICggdHlwZW9mIGltZyA9PT0gJ29iamVjdCcgJiYgaW1nLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ltZycgKSB7XG4gICAgICAgIHNyYyA9IGltZy5zcmM7XG4gICAgfVxuXG4gICAgaWYgKCB0eXBlb2YgaW1nID09PSAnc3RyaW5nJyApIHtcbiAgICAgICAgc3JjID0gaW1nO1xuICAgIH1cblxuXG4gICAgb3B0aW9ucy50eXBlID0gdHlwZXNbIG9wdGlvbnMudHlwZSBdIHx8IGdldFR5cGUoIHNyYyApO1xuICAgIG9wdGlvbnMuc3JjID0gc3JjO1xuICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICBpZiAoICFvcHRpb25zLnR5cGUgKSB7XG5cbiAgICAgICAgY2FsbGJhY2soIG5ldyBFcnJvciggJ0ltYWdlIHR5cGUgaXMgbm90IHN1cHBvcnRlZCcgKSApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW1hZ2VUb1VyaSggc3JjLCBvcHRpb25zLnR5cGUsIGhhbmRsZUltYWdlVG9VUkkuYmluZCggbnVsbCwgb3B0aW9ucyApICk7IC8vIGF0dGVtcHQgaWYgd2UgaGF2ZSBhIFxufVxuXG5mdW5jdGlvbiBkYXRhVVJJdG9CbG9iKCB1cmkgKSB7XG4gICAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICAgIHZhciBieXRlU3RyaW5nLFxuICAgICAgICBtaW1lU3RyaW5nLFxuICAgICAgICBpYTtcblxuICAgIGlmICggdXJpLnNwbGl0KCAnLCcgKVswXS5pbmRleE9mKCAnYmFzZTY0JyApID49IDAgKSB7XG5cbiAgICAgICAgYnl0ZVN0cmluZyA9IGF0b2IoIHVyaS5zcGxpdCgnLCcpWzFdICk7XG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgICAgIGJ5dGVTdHJpbmcgPSB1bmVzY2FwZSggdXJpLnNwbGl0KCcsJylbMV0gKTtcbiAgICB9XG5cbiAgICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gICAgbWltZVN0cmluZyA9IHVyaS5zcGxpdCggJywnIClbIDAgXS5zcGxpdCggJzonIClbIDEgXS5zcGxpdCggJzsnIClbIDAgXTtcblxuICAgIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgICBpYSA9IG5ldyBVaW50OEFycmF5KCBieXRlU3RyaW5nLmxlbmd0aCApO1xuXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgXG4gICAgICAgIGlhWyBpIF0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoIGkgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJsb2IoIFsgaWEgXSwge1xuICAgICAgICB0eXBlOiBtaW1lU3RyaW5nXG4gICAgfSApO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVJbWFnZVRvVVJJKCBvcHRpb25zLCBlcnIsIHVyaSApIHtcblxuICAgIGlmICggZXJyICkge1xuICAgICAgICBvcHRpb25zLmNhbGxiYWNrKCBlcnIgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9wdGlvbnMuY2FsbGJhY2soIG51bGwsIGRhdGFVUkl0b0Jsb2IoIHVyaSApICk7XG5cbn1cblxuZnVuY3Rpb24gZ2V0VHlwZSggdXJsICkge1xuICAgIHJldHVybiB0eXBlc1sgdXJsLnNwbGl0KCAnPycgKS5zaGlmdCggKS5zcGxpdCggJy4nICkucG9wKCApIF07XG59XG4iLCIvLyBjb252ZXJ0cyBhIFVSTCBvZiBhbiBpbWFnZSBpbnRvIGEgZGF0YVVSSVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBtaW1lVHlwZSwgY2IpIHtcbiAgICAvLyBDcmVhdGUgYW4gZW1wdHkgY2FudmFzIGFuZCBpbWFnZSBlbGVtZW50c1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcbiAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICBpZiAoIHR5cGVvZiBtaW1lVHlwZSA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgY2IgPSBtaW1lVHlwZTtcbiAgICAgICAgbWltZVR5cGUgPSBudWxsO1xuICAgIH1cblxuICAgIG1pbWVUeXBlID0gbWltZVR5cGUgfHwgJ2ltYWdlL3BuZyc7XG5cbiAgICAvLyBhbGxvdyBmb3IgY3Jvc3Mgb3JpZ2luIHRoYXQgaGFzIGNvcnJlY3QgaGVhZGVyc1xuICAgIGltZy5jcm9zc09yaWdpbiA9IFwiQW5vbnltb3VzXCI7IFxuXG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAvLyBtYXRjaCBzaXplIG9mIGltYWdlXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG5cbiAgICAgICAgLy8gQ29weSB0aGUgaW1hZ2UgY29udGVudHMgdG8gdGhlIGNhbnZhc1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBkYXRhLVVSSSBmb3JtYXR0ZWQgaW1hZ2VcbiAgICAgICAgY2IoIG51bGwsIGNhbnZhcy50b0RhdGFVUkwoIG1pbWVUeXBlICkgKTtcbiAgICB9O1xuXG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNiKG5ldyBFcnJvcignRmFpbGVkVG9Mb2FkSW1hZ2UnKSk7XG4gICAgfTtcblxuICAgIC8vIGNhbnZhcyBpcyBub3Qgc3VwcG9ydGVkXG4gICAgaWYgKCFjYW52YXMuZ2V0Q29udGV4dCkge1xuICAgICAgICBjYihuZXcgRXJyb3IoJ0NhbnZhc0lzTm90U3VwcG9ydGVkJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgfVxufTtcbiJdfQ==
