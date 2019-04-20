class Parallax {
  constructor(el = '.parallax', options) {
    this.options = {
      ...Parallax.DEFAULTS,
      ...options
    };

    this.config = {
      el: el,
      pause: false,
      update: false,
      posY: 0,
      screenY: 0,
      transformProp: this._transformProp(),
      screenHeight: window.innerHeight || 0,
      elems: [],
      elemsInit: []
    };

    window.requestAnimFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    this.options.speed = this._clamp(this.options.speed);

    this._animate = this._animate.bind(this);
    this._update = this._update.bind(this);

    this._init();
  }

  static get DEFAULTS() {
    return {
      speed: -2,
      interval: [-10, 10]
    };
  }

  _init() {
    this._elemsInit();
    this._eventBind();
  }

  _elemsInit() {
    let elements = document.querySelectorAll(this.config.el);
    if (elements.length > 0) {
      this.config.elems = [].slice.call(elements);
    } else {
      throw new Error(
        `The elements(${el}) you're trying to select don't exist.`
      );
    }

    for (var i = 0; i < this.config.elems.length; i++) {
      var initInfo = this._createInit(this.config.elems[i]);
      this.config.elemsInit.push(initInfo);
    }
  }

  _createInit(el) {
    let speed = el.getAttribute('data-parallax-speed');
    return {
      speed: !!speed ? this._clamp(+speed) : this.options.speed,
      top: el.getBoundingClientRect().top,
      height: el.clientHeight || el.offsetHeight || el.scrollHeight || 0,
      style: this.config.update ? '' : el.style.cssText
    };
  }

  _eventBind() {
    this._setPosition();
    window.addEventListener('resize', this._animate);
    this._update();
    this._animate();
  }

  _setPosition() {
    let oldY = this.config.posY;
    this.config.posY = this._screenY();

    if (oldY != this.config.posY) {
      return true;
    }
    return false;
  }

  _screenY() {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    } else {
      return (document.documentElement ||
        document.body.parentNode ||
        document.body).scrollTop;
    }
  }

  _animate() {
    for (let i = 0; i < this.config.elemsInit.length; i++) {
      let el = this.config.elemsInit[i];
      let position =
        (this.config.screenY - this.config.posY) * (1 + el.speed * 0.1) +
        this.config.posY;
      let translate = 'translate3d(0, ' + position + 'px, 0)';
      this.config.elems[i].style[this.config.transformProp] = translate;
    }
  }

  _update() {
    if (this._setPosition() && this.config.pause === false) {
      this._animate();
    }
    window.requestAnimFrame(this._update);
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  update() {
    this.config.update = true;
    this.config.elemsInit = [];
    this._init();
  }

  destory() {
    window.removeEventListener('resize', this._animate);
    for (var i = 0; i < this.config.elems.length; i++) {
      this.config.elems[i].style.cssText = this.config.elemsInit[i].style;
    }
    this.config.pause = true;
  }

  /**
  * ================================== HELPER ==================================
  */

  _transformProp() {
    return (
      window.transformProp ||
      (function() {
        var testEl = document.createElement('div');
        if (testEl.style.transform == null) {
          var vendors = ['Webkit', 'Moz', 'ms'];
          for (var vendor in vendors) {
            if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
              return vendors[vendor] + 'Transform';
            }
          }
        }
        return 'transform';
      })()
    );
  }

  _clamp(num) {
    let min = this.options.interval[0];
    let max = this.options.interval[1];
    return num <= min ? min : num >= max ? max : num;
  }
}

window.Parallax = Parallax;
module.exports = Parallax;
