import './index.scss';
import dom from './dom.js';

class Magnifier {
  constructor(options) {
    this.options = {
      ...Magnifier.DEFAULTS,
      ...options
    };

    this.targets = Array.from(document.querySelectorAll('[data-magnifier]')).map(target => ({
      target: target,
      thumbImg: null,
      bigImg: null,
      tracker: null,
      zoom: null,
      loader: null,
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      imgLoaded: false,
      trackerSize: 0,
      trackerLeft: 0,
      trackerTop: 0
    }));
    
    this.transformProp = this._transformProp();
    this._targetHover = this._targetHover.bind(this);
    this._init();
  }

  static get DEFAULTS() {
    return {
      size: 200,
      position: "right",
      margin: 20,
      showTitle: true
    };
  }

  _init() {
    this.targets.forEach((targetObj, index) => {
      targetObj.target.addEventListener('mousemove', this._targetHover.bind(this, index), false);
      targetObj.target.addEventListener('mouseout', this._targetOut.bind(this, index), false);
    });
  }

  _targetHover(index, e) {
    let targetObj = this.targets[index];
    if(!targetObj.target.getAttribute('data-magnifier-index')){
      targetObj.target.setAttribute('data-magnifier-index', index);
      this._creatDom(targetObj);
      targetObj.width = targetObj.thumbImg.scrollWidth;
      targetObj.height = targetObj.thumbImg.scrollHeight;
    };

    // 计算鼠标相对图片的距离
    let pos = this._getPointer(targetObj.thumbImg, e);
    targetObj.left = pos.left;
    targetObj.top = pos.top;

    if(targetObj.imgLoaded){
      this._trackerEvent(targetObj);
      this._zoomEvent(targetObj);
    } else {
      targetObj.loader.style.display = 'block';
      this._imgLoad(targetObj.bigImg).then(() => {
        targetObj.imgLoaded = true;
        targetObj.loader.style.display = 'none';
        this._trackerEvent(targetObj);
        this._zoomEvent(targetObj);
      });
    }
  }

  _targetOut(index, e){
    let targetObj = this.targets[index];
    targetObj.tracker.style.display = targetObj.zoom.style.display = 'none';
    targetObj.tracker.style.left = 0;
    targetObj.tracker.style.top = 0;
  }

  _creatDom(targetObj){
    let imgUrl = targetObj.target.getAttribute('href');
    dom.insertHtml(targetObj.target, 'beforeend', `<div class="magnifier-tracker"></div>`);
    dom.insertHtml(targetObj.target, 'beforeend', `<div class="magnifier-zoom"><img src="${imgUrl}"></div>`);
    dom.insertHtml(targetObj.target, 'beforeend', `<div class="magnifier-loader"></div>`);
    targetObj.thumbImg = targetObj.target.querySelector('img');
    targetObj.bigImg = targetObj.target.querySelector('.magnifier-zoom img');
    targetObj.tracker = targetObj.target.querySelector('.magnifier-tracker');
    targetObj.zoom = targetObj.target.querySelector('.magnifier-zoom');
    targetObj.loader = targetObj.target.querySelector('.magnifier-loader');
    if(this.options.showTitle){
      let title = targetObj.target.getAttribute('title');
      dom.insertHtml(targetObj.zoom, 'beforeend', `<div class="magnifier-title">${title}</div>`);
    }
  }

  _trackerEvent(targetObj){
    // 跟踪器大小
    let trackerSize = targetObj.trackerSize = Math.min(targetObj.width, targetObj.height) / 5;
    targetObj.tracker.style.width = targetObj.tracker.style.height = trackerSize + 'px';
    targetObj.tracker.style.display = targetObj.zoom.style.display  = 'block';

    // X坐标
    let trackerX = 0;
    if(targetObj.left <= trackerSize / 2){
      trackerX = 0;
    } else if(targetObj.left > targetObj.width - trackerSize / 2){
      trackerX = targetObj.width - trackerSize;
    } else {
      trackerX = targetObj.left - trackerSize / 2;
    }

    // Y坐标
    let trackerY = 0;
    if(targetObj.top <= trackerSize / 2){
      trackerY = 0;
    } else if(targetObj.top > targetObj.height - trackerSize / 2){
      trackerY = targetObj.height - trackerSize;
    } else {
      trackerY = targetObj.top - trackerSize / 2;
    }

    targetObj.trackerLeft = trackerX;
    targetObj.tracker.style.left = trackerX + 'px';
    targetObj.trackerTop = trackerY;
    targetObj.tracker.style.top = trackerY + 'px';
  }

  _zoomEvent(targetObj){
    // 容器大小
    targetObj.zoom.style.width = targetObj.zoom.style.height = this.options.size + 'px';

    // 容器位置
    let zoomTop = 0;
    let zoomLeft = 0;
    if(this.options.position === 'top'){
      zoomTop = -(this.options.height + this.options.margin) + 'px';
      zoomLeft = 0;
    } else if(this.options.position === 'right'){
      zoomTop = 0;
      zoomLeft = targetObj.width + this.options.margin + 'px';
    } else if(this.options.position === 'bottom'){
      zoomTop = targetObj.height + this.options.margin + 'px';
      zoomLeft = 0;
    } else if(this.options.position === 'left'){
      zoomTop = 0;
      zoomLeft = -(this.options.width + this.options.margin) + 'px';
    }
    targetObj.zoom.style.left = zoomLeft;
    targetObj.zoom.style.top = zoomTop;

    // 图片动画：强制同步放大比率
    let ratio = this.options.size / targetObj.trackerSize;
    targetObj.bigImg.style.width = targetObj.width * ratio + 'px';
    targetObj.bigImg.style[this.transformProp] = `translate3d(-${targetObj.trackerLeft * ratio}px, -${targetObj.trackerTop * ratio}px, 0)`;
  }

  _getPointer(target, e){
    return {
      left: e.pageX - target.x,
      top: e.pageY - target.y
    }
  }

  _imgLoad(image){
    const imageHasLoaded = (img) => !('naturalHeight' in img && img.naturalHeight + img.naturalWidth === 0) || img.width + img.height !== 0;    
    return new Promise((resolve, reject) => {
      if (image.complete) {
        if (!imageHasLoaded(image)) {
          return reject(image);
        }
        return resolve(image);
      }
      image.addEventListener('load', () => {
        if (imageHasLoaded(image)) {
          return resolve(image);
        }
        return reject(image);
      });
      image.addEventListener('error', () => {
        return reject(image);
      });
    });
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

  destory(){
    this.targets.forEach(targetObj => {
      targetObj.target.removeEventListener('mousemove', this._targetHover, false);
      targetObj.target.removeEventListener('mouseout', this._targetOut, false);
      targetObj.target.removeAttribute('data-magnifier-index');
      dom.removeElement(targetObj.tracker);
      dom.removeElement(targetObj.zoom);
      dom.removeElement(targetObj.loader);
    });
  }
}

window.Magnifier = Magnifier;
module.exports = Magnifier;