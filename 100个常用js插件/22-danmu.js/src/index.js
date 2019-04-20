import './index.scss';
import dom from './dom.js';

class Danmu {
  constructor(el, options) {
    this.options = {
      ...Danmu.DEFAULTS,
      ...options
    };

    this.containerEl = el instanceof Element ? el : document.querySelector(el),
    this.danmusData = [];
    this.transformProp = this._transformProp();
    this.startTime = null;
    this.containerElSize = {
      width: 0,
      height: 0
    }

    this._init();
  }

  static get DEFAULTS() {
    return {
      zIndex: 100,
      speed: 7000,
      color: "#FFFFFF",
      fontSize: [18, 24],
      opacity: 0.9,
      safeDistance: [10, 50]
    };
  }

  _init(){
    dom.insertHtml(this.containerEl, 'beforeend', `<div class="__danmu__"></div>`);
    this.danmuEl = this.containerEl.querySelector('.__danmu__');
    this.danmuEl.style.zIndex = this.options.zIndex;
    this.danmuEl.style.opacity = this.options.opacity;
    this.containerElSize.width = Number(this._getStyle(this.containerEl, 'width').replace(/px/, ''));
    this.containerElSize.height = Number(this._getStyle(this.containerEl, 'height').replace(/px/, ''));
  }

  _play(danmuItem, newDanmu, callback){
    dom.insertHtml(this.danmuEl, 'beforeend', `<div class="__danmu__item" id="id_${danmuItem.id}" style="
      left: ${this.containerElSize.width}px;
      font-size: ${this.options.fontSize[danmuItem.size]}px;
      color: ${danmuItem.color};
    ">${danmuItem.text}</div>`);
    let danmuItemEl = this.danmuEl.querySelector(`#id_${danmuItem.id}`);
    let danmuItemWidth = Number(this._getStyle(danmuItemEl, 'width').replace(/px/, ''));
    let danmuItemHeight = Number(this._getStyle(danmuItemEl, 'height').replace(/px/, ''));
    let xDistance = danmuItemWidth + this.containerElSize.width + (newDanmu ? 2 : 0);
    danmuItemEl.style[this.transformProp] = `translate3d(-${xDistance}px, 0, 0)`;
    danmuItemEl.style.top = `${this._randomInt(this.options.safeDistance[0], this.containerElSize.height - danmuItemHeight - this.options.safeDistance[1])}px`;
    danmuItemEl.style.transition = `${this.transformProp} ${danmuItem.speed || this.options.speed}ms linear`;
    if(danmuItem.border){
      danmuItemEl.style.textShadow = `${danmuItem.border} 1px 0px 1px, ${danmuItem.border} 0px 1px 1px, ${danmuItem.border} 0px -1px 1px, ${danmuItem.border} -1px 0px 1px`;
    }
    if(newDanmu) danmuItemEl.style.border = `1px solid ${danmuItem.color}`;
    if(callback) callback(danmuItem);
    setTimeout(() => {
      dom.removeElement(danmuItemEl);
    }, danmuItem.speed || this.options.speed)
  }

  _randomId(){
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  _getStyle(el, property){
    return window.getComputedStyle(el, null).getPropertyValue(property);
  }

  _randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

  start(){
    this.startTime = new Date().getTime();
    this.danmusData.forEach(danmu => {
      setTimeout(() => {
        this.send(danmu, null, false);
      }, danmu.time);
    });
    return this;
  }

  send(danmu, callback, newDanmu = true){
    let danmuItem = {
      ...danmu,
      id: this._randomId(),
      time: this.startTime ? new Date().getTime() - this.startTime : 0
    }
    this._play(danmuItem, newDanmu, callback);
    return this;
  }

  setDanmu(danmus){
    this.danmusData = danmus;
    return this;
  }
}

window.Danmu = Danmu;
module.exports = Danmu;