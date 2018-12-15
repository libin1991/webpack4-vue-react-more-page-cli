# Image to Blob [![Build Status](https://travis-ci.org/jcblw/image-to-blob.svg?branch=master)](https://travis-ci.org/jcblw/image-to-blob)

[![Greenkeeper badge](https://badges.greenkeeper.io/jcblw/image-to-blob.svg)](https://greenkeeper.io/)

Image to Blob is a simple utility that will convert images to blobs this can be used for urls to images, that are not cross domain, and IMG DOM node. Its intended to be used with [Browserify](http://browserify.org).

## Install

    $ npm install image-to-blob

## Example Usage

```javascript
var imageToBlob = require( 'image-to-blob' ),
    foo = document.getElementById( 'foo' ),
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

imageToBlob( foo, appendBlob );
imageToBlob( './bar.svg', appendBlob );
```

> This will convert SVG images to pngs.

