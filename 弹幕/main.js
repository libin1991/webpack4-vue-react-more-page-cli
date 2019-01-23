(function ($) {
    $.bulletScreen = {
        timers: [], 
        add: function (val, container) {
            var odiv = $("<div class='bullet'></div>");
            odiv.text(val);
            odiv.css({
                position: 'absolute', 
                fontSize: '20px', 
                display: 'block', 
                whiteSpace: 'nowrap'
            });
            var r = this.colors();
            var g = this.colors();
            var b = this.colors();
            odiv.css({
                color: "rgb(" + r + "," + g + "," + b + ")",
                top: (Math.floor(Math.random() * (container.height() - 20))) + "px",
                width: odiv.width(), 
                right: 0
            });
            container.append(odiv);
            this.move(odiv, container);
        }, 
        colors: function () {
            return Math.floor(Math.random() * 255);
        }, 
        send: function (val, container) {
            this.add(val, container);
        }, 
        move: function (odiv, container) {
            var i = 0;
            var timer = setInterval(function () {
                odiv.css({
                    right: (i += 1) + "px"
                });
                if ((odiv.offset().left + odiv.width()) < container.offset().left) {
                    i = 0; 
                    odiv.css({
                        right: (i += Math.floor(Math.random())) + "px"
                    });
                }
            }, 10);
            this.timers.push(timer);
        }, 
        clear: function (container) {
            for (var i = 0; i < this.timers.length; i++) {
                clearInterval(this.timers[i])
            }
            container.find('.bullet').remove();
        }
    }
})(jQuery);