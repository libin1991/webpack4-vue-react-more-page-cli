class Turntable {
  constructor(el = '.turntable', options) {
    this.options = {
      ...Turntable.DEFAULTS,
      ...options
    };

    this.config = {
      el: el instanceof Element ? el : document.querySelector(el),
      elLeft: 0,
      eltop: 0,
      elWidth: 0,
      elHeidth: 0,
      triggerType: ['hover', 'scroll'],
      className: '__turntable__',
      play: false
    };

    window.requestAnimFrame = (function() {
      return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      });
    })();

    window.cancelAnimationFrame = (function() {
      return (window.cancelAnimationFrame || Window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {
        window.clearTimeout(id);
      });
    })();

    this._eventBind = this._eventBind.bind(this);
    this._eventHover = this._eventHover.bind(this);
    this._eventScroll = this._eventScroll.bind(this);

    this._init();
  }

  static get DEFAULTS() {
    return {
      images: [''],
      trigger: 'hover',
      throttle: 500
    };
  }

  _init() {
    this._creatDom();
  }

  _creatDom() {
    this.config.el.classList.add(this.config.className);
    this.config.elLeft = this.config.el.getBoundingClientRect().left;
    this.config.elTop = this.config.el.getBoundingClientRect().top;
    this.config.elWidth = +this._getStyle(this.config.el, 'width').replace(/px/, '');
    this.config.elHeidth = +this._getStyle(this.config.el, 'height').replace(/px/, '');
    this.options.images.map(url => {
      this._preload(url);
    });
  }

  _preload(url) {
    let self = this;
    let img = new Image();
    img.src = url;
    img.onload = function() {
      self._throttle(self._eventBind, self.options.throttle); //节流
    };
  }

  _eventBind() {
    if (this.options.trigger === 'hover') {
      this._setImg(this.options.images[0]);
      this.config.el.addEventListener('mousemove', this._eventHover);
    } else if (this.options.trigger === 'scroll') {
      this._eventScroll();
      window.addEventListener('scroll', this._eventScroll);
    } else {
      throw new TypeError(`Turntable required trigger attributes: ${this.config.triggerType.join(',')}`);
    }
  }

  _eventHover(event) {
    let ImgIndex = Math.floor((event.clientX - this.config.elLeft) / (this.config.elWidth / this.options.images.length));
    (ImgIndex <= this.options.images.length - 1) && this._setImg(this.options.images[ImgIndex]);
  }

  _eventScroll() {
    let ImgIndex = Math.floor(this._screenY() / ((document.body.offsetHeight - window.innerHeight) / this.options.images.length));
    (ImgIndex <= this.options.images.length - 1) && this._setImg(this.options.images[ImgIndex]);
  }

  _setImg(src) {
    if (this.config.imgDom) {
      this.config.imgDom.src = src;
    } else {
      this.config.el.insertAdjacentHTML('beforeend', `<img class="${this.config.className}img" src="${src}">`);
      this.config.imgDom = this.config.el.querySelector(`.${this.config.className}img`);
    }
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  destory() {
    this.options.images = [];
    this.config.el.classList.remove(this.config.className);
    this.config.imgDom.parentNode.removeChild(this.config.imgDom);
    if (this.options.trigger === 'hover') {
      this.config.el.removeEventListener('mousemove', this._eventHover);
    } else if (this.options.trigger === 'scroll') {
      window.removeEventListener('scroll', this._eventScroll);
    }
  }

  play() {
    if (this.config.play) return;
    this.config.play = true;
    let self = this;
    let ImgIndex = 0;
    let timer;
    window.cancelAnimationFrame(timer);
    timer = window.requestAnimFrame(function animate() {
      if (ImgIndex >= self.options.images.length) {
        window.cancelAnimationFrame(timer);
        self.config.play = false;
      } else {
        self._setImg(self.options.images[ImgIndex++]);
        timer = window.requestAnimationFrame(animate);
      }
    });
  }

  /**
  * ================================== HELPER ==================================
  */

  _throttle(method, time) {
    clearTimeout(method.tId);
    method.tId = setTimeout(() => {
      method();
    }, time);
  }

  _getStyle(el, attr) {
    if (el && el.currentStyle) {
      return el.currentStyle[attr]
    } else {
      return window.getComputedStyle(el)[attr]
    }
  }

  _screenY() {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    } else {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
  }

}

window.Turntable = Turntable;
module.exports = Turntable;
