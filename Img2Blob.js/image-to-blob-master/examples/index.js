
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