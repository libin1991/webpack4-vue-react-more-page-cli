# Img2Blob.js
Lightweight javascript-based. Convert internal image url to blob url &amp; add watermark.

<h4>HTML</h4>
<pre>&lt;h3&gt;Default&lt;/h3&gt;
&lt;img class="sample1" data-img2blob="img/1.png" /&gt;
&lt;img class="sample1" data-img2blob="img/2.jpg" /&gt;

&lt;hr&gt;

&lt;h3&gt;With Watermark&lt;/h3&gt;
&lt;img class="sample2" data-img2blob="img/1.png" /&gt;
&lt;img class="sample2" data-img2blob="img/2.jpg" /&gt;</pre>

<h4>Js</h4>
<pre>&lt;script src="https://code.jquery.com/jquery-2.1.3.min.js"&gt;&lt;/script&gt;
&lt;script src="js/img2blob.js"&gt;&lt;/script&gt;        
&lt;script&gt;
$(function() {

    // default
    $(".sample1").img2blob();
    
    // with watermark
    $(".sample2").img2blob({
        watermark: '@bachors',
        fontStyle: 'Arial',
        fontSize: '30', // px
        fontColor: '#333', // default 'black'
        fontX: 50, // The x coordinate where to start painting the text
        fontY: 50 // The y coordinate where to start painting the text
    });

});
&lt;/script&gt;</pre>

<h4>Result</h4>
<pre>blob:http://...</pre>
