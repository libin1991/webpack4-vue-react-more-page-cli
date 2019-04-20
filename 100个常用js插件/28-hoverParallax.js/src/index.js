import './index.scss';
import dom from './dom.js';

class HoverParallax {
  constructor(el = '.parallax') {
    this.event = null;
    this.contanterEl = el instanceof Element ? el : document.querySelector(el);
    this.layerEls = [];
    this._mousemove = this._mousemove.bind(this);
    this._mouseenter = this._mouseenter.bind(this);
    this._mouseleave = this._mouseleave.bind(this);
    this._getRelPos = this._getRelPos.bind(this);
    this._init();
  }

  _init() {
    if (!this.contanterEl) throw new TypeError(`Can't find dom element`);
    window.addEventListener('mousemove', this._mousemove);
    this.contanterEl.addEventListener('mouseenter', this._mouseenter);
    this.contanterEl.addEventListener('mouseleave', this._mouseleave);
    this.layerEls = Array.from(this.contanterEl.querySelectorAll('[data-depth]')).map(layer => {
      return {
        el: layer,
        depth: this._clampNumber(Number(layer.dataset.depth), 0, 10)
      }
    });
  }

  _mousemove(event) {
    this.event = event;
    let target = event.target;
    if (event.path.includes(this.contanterEl)) {
      let relPos = this._getRelPos();
      let baseOffset = Math.min(this.contanterEl.clientWidth, this.contanterEl.clientHeight) / 10;
      this.layerEls.forEach(layer => {
        let x = layer.depth * relPos.x * baseOffset;
        let y = layer.depth * relPos.y * baseOffset;
        layer.el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      });
    }
  }

  _mouseenter() {
    this.layerEls.forEach(layer => {
      layer.el.style.transition = `all 100ms ease`;
    });
    setTimeout(() => {
      this.layerEls.forEach(layer => {
        layer.el.style.transition = '';
      });
    }, 100);
  }

  _mouseleave() {
    this.layerEls.forEach(layer => {
      layer.el.style.transform = `translate3d(0px, 0px, 0px)`;
      layer.el.style.transition = `all 300ms ease`;
    });
  }

  _getRelPos() {
    let mX = this.event.pageX;
    let mY = this.event.pageY;
    let cX = this.contanterEl.offsetLeft;
    let cY = this.contanterEl.offsetTop;
    let cW = this.contanterEl.clientWidth;
    let cH = this.contanterEl.clientHeight;
    let centerX = cX + cW / 2;
    let centerY = cY + cH / 2;
    return {
      x: -Number(((mX - centerX) / cW).toFixed(3)),
      y: -Number(((mY - centerY) / cH).toFixed(3)),
    }
  }

  _clampNumber(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
  }

  destroy() {
    window.removeEventListener('mousemove', this._mousemove);
    this.contanterEl.removeEventListener('mouseenter', this._mouseenter);
    this.contanterEl.removeEventListener('mouseleave', this._mouseleave);
    this.layerEls.forEach(layer => {
      layer.el.style.transform = ``;
      layer.el.style.transition = ``;
    });
  }
}

window.HoverParallax = HoverParallax;
module.exports = HoverParallax;
