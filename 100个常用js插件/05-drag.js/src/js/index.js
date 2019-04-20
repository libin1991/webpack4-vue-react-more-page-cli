class Drag {
  constructor(options) {
    if (typeof options === 'undefined') {
      throw new TypeError('Drag required `options`.');
    } else if (typeof options.container === 'undefined') {
      throw new TypeError('Drag required `container` option.');
    } else if (typeof options.dragEle === 'undefined') {
      throw new TypeError('Drag required `dragEle` option.');
    }

    if (options.container instanceof Element) {
      this.container = options.container;
    } else {
      this.container = document.querySelectorAll(options.container)[0];
    }

    if (options.dragEle instanceof Element) {
      this.dragEle = options.dragEle;
    } else {
      this.dragEle = document.querySelectorAll(options.dragEle)[0];
    }

    this.ondrag = options.ondrag || new Function();
    this.moveState = false;

    this._mousedown = this._mousedown.bind(this);
    this._mouseup = this._mouseup.bind(this);
    this._mouseMove = this._mouseMove.bind(this);

    this._init();
  }

  _init() {
    this.dragEle.addEventListener('mousedown', this._mousedown, false);
  }

  _mousedown(e){
    e.preventDefault();
    this.moveState = true;
    this.cache = { x: e.pageX, y: e.pageY }
    document.addEventListener('mousemove', this._mouseMove, false)
    document.addEventListener('mouseup', this._mouseup, false);
  }

  _mouseup(e){
    this.moveState = false;
    document.removeEventListener('mousemove', this._mouseMove, false)
    document.removeEventListener('mouseup', this._mouseup, false)
  }

  _mouseMove(e){
    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientWidth;
    let containerWidth = +this._getStyle(this.container, 'width').replace(/px/, '');
    let containerHeight = +this._getStyle(this.container, 'height').replace(/px/, '');
    let containerTop = +this._getStyle(this.container, 'top').replace(/px/, '');
    let containerRight = +this._getStyle(this.container, 'right').replace(/px/, '');
    let containerBottom = +this._getStyle(this.container, 'bottom').replace(/px/, '');
    let containerLeft = +this._getStyle(this.container, 'left').replace(/px/, '');
    let moveX = containerLeft + e.pageX - this.cache.x;
    let moveY = containerTop + e.pageY - this.cache.y;
    moveX = containerLeft <= 0 ? 1 : (containerRight <= 0 ? (bodyWidth - containerWidth - 1) : moveX);
    moveY = containerTop <= 0 ? 1 : moveY;
    this.cache = { x: e.pageX, y: e.pageY };
    if (this.moveState) {
      this.container.style.left = moveX + 'px';
      this.container.style.top = moveY + 'px';
      e.drag = { x: moveX, y: moveY };
      this.ondrag(e);
    }
  }

  _getStyle(el, attr) {
    if (el && el.currentStyle) {
      return el.currentStyle[attr]
    } else {
      return window.getComputedStyle(el)[attr]
    }
  }

}

window.Drag = Drag;
module.exports = Drag;
