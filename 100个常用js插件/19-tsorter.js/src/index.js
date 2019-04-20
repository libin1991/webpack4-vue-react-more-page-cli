import './index.scss';
import listen from './listener.js';
import dom from './dom.js';

class Tsorter {
  constructor(el = '.table', options) {
    this.options = {
      ...Tsorter.DEFAULTS,
      ...options
    };

    this.config = {
      containerEl: el instanceof Element ? el : document.querySelector(el),
      cache: [],
      tbodyEl: null,
      theadEl: null,
      tbodyTrs: [],
      theadThs: [],
      event: {}
    };

    this._init();
  }

  static get DEFAULTS() {
    return {
      sorters: {},
      default: '',
      update: new Function()
    };
  }

  _init() {
    this.config.cache = [].slice.call(this.config.containerEl.childNodes);
    this.config.theadThs = [].slice.call(this.config.containerEl.querySelectorAll('thead tr th'));
    this.config.tbodyEl = this.config.containerEl.querySelector('tbody');
    this.config.theadEl = this.config.containerEl.querySelector('thead');
    this.config.tbodyTrs = [].slice.call(this.config.containerEl.querySelectorAll('tbody tr')); 
    this.config.containerEl.classList.add('__tsorter__');
    this.options.default && this._default();
    this._eventBind();
  }

  /**
   * ================================== PRIVATE METHODS ==================================
   */

  _default(){
    let target = this.config.containerEl.querySelector(`[data-tsorter-name=${this.options.default.split('=')[0]}]`);    
    let type = this.options.default.split('=')[1];    
    target && type && this._sortDom(target, type);
  } 

  _eventBind() {
    let sorters = this.config.containerEl.querySelectorAll('thead tr th');
    this.config.event = listen(sorters, 'click', e => {
      this._creatDom(e.target);
    });
  }

  _creatDom(target) {
    if(dom.hasClass(target, 'ascend')) {
      this._sortDom(target, 'descend');
    } else {
      this._sortDom(target, 'ascend');
    }
  }

  _sortDom(target, type) {
    this.config.theadThs.map(item => {
      dom.removeClass(item, 'ascend');
      dom.removeClass(item, 'descend');
    });
    dom.addClass(target, type);
    let sorterType = target.getAttribute('data-tsorter-type');
    let sorterName = target.getAttribute('data-tsorter-name');
    let fn = this.options.sorters[target.getAttribute('data-tsorter-fn')];
    let domIndex = this.config.theadThs.indexOf(target);
    let domList = this.config.tbodyTrs.sort((a, b) => {
      let aDomList = [].slice.call(a.querySelectorAll('td'));
      let bDomList = [].slice.call(b.querySelectorAll('td'));
      let aText = aDomList[domIndex].textContent.trim();
      let bText = bDomList[domIndex].textContent.trim();
      if(fn && typeof fn === 'function') { // 自定义函数排序
        return fn(aDomList[domIndex], bDomList[domIndex], type);
      } else if (sorterType == 'numeric') { // 数字排序
        return type === 'ascend' ? Number(aText) - Number(bText) : Number(bText) - Number(aText);
      } else { // Unicode排序
        return type === 'ascend' ? aText.localeCompare(bText) : bText.localeCompare(aText);
      }
    });
    this._removeElement(this.config.containerEl.querySelector('tbody'));
    let tbody = document.createElement('tbody');
    let i = -1;
    let length = domList.length;
    while(++i < length){
      tbody.appendChild(domList[i]);
    }
    this.config.containerEl.appendChild(tbody);
    this.options.update(sorterName + '=' + type);
  }

  /**
   * ================================== PUBLIC METHODS ==================================
   */

  destroy() {
    this.config.event.destroy();
  }

  /**
   * ================================== HELPER ==================================
   */

  _removeElement(el){
    el && el.parentNode && el.parentNode.removeChild(el);
  }
  
}

window.Tsorter = Tsorter;
module.exports = Tsorter;
