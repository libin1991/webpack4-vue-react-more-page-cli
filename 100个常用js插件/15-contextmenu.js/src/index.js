import './index.scss';

class Contextmenu {
  constructor(el = 'body', options) {
    this.options = {
      ...Contextmenu.DEFAULTS,
      ...options
    };

    this.config = {
      el: el,
      containerEl: el instanceof Element ? el : document.querySelector(el),
      menuEl: null,
      listEl: null,
      eventCache: null
    };

    this._init();
  }

  static get DEFAULTS() {
    return {
      menu: []
    };
  }

  _init() {
    // 容器以内右键
    this.config.containerEl.addEventListener('contextmenu', e => {
      e.preventDefault();      
      this.config.eventCache = e;
      this._creatDom();
      this._setPos(e);
    });

    // 容器以外右键
    document.addEventListener('contextmenu', e => {
      if(!this.config.menuEl) return;
      if(!this._closest(e.target, this.config.el)){
        this.hide();
      }
    });

    // 菜单以外左键
    document.addEventListener('click', e => {
      if(!this.config.menuEl) return;
      if(!this._closest(e.target, '#contextmenu')){
        this.hide();
      }
    })
  }

  /**
   * ================================== PRIVATE METHODS ==================================
   */

  // 创建dom
  _creatDom(){
    if(this.config.menuEl){
      this.config.menuEl.classList.remove('hide');
      return;
    };
    document.body.insertAdjacentHTML('beforeend', `<div id="contextmenu"><ul class="list"></ul></div>`);
    this.config.menuEl = document.querySelector('#contextmenu');
    this.config.listEl = this.config.menuEl.querySelector('.list');
    this._creatMenu();
  }

  // 创建菜单
  _creatMenu(){
    this.options.menu.map(item => {
      return this._menuMap(item);
    }).forEach(item => {
      this.config.listEl.appendChild(item);
    });
  }

  // 设置坐标
  _setPos(e){
    let {x, y} = this._getMousePos(e);
    let containerWidth = +this._getStyle(this.config.containerEl, 'width').replace(/px/, '');
    let containerleft = this.config.containerEl.offsetLeft;
    let menuWidth = +this._getStyle(this.config.menuEl, 'width').replace(/px/, '');
    if((x + menuWidth) > (containerWidth + containerleft)){
      x -= menuWidth;
      this.config.menuEl.classList.add('left');
    } else {
      this.config.menuEl.classList.remove('left');
    }
    this.config.menuEl.style.top = y + 'px';
    this.config.menuEl.style.left = x + 'px';
  }

  // 遍历菜单
  _menuMap(item){
    let {name, children, callback, disabled, border} = item;
    if(!(typeof name === 'string' || typeof name === 'number')){
      throw new TypeError('name required type of `string` or `number`.');
    } else if (children && Object.prototype.toString.call(children) !== '[object Array]'){
      throw new TypeError('children required type of `array`.');
    } else if (callback && typeof callback !== 'function'){
      throw new TypeError('callback required type of `function`.');
    }
    let menuIten = document.createElement('li');
    menuIten.innerHTML = name;
    if(children && children.length > 0){
      menuIten.classList.add('children');
      let menuItenUl = document.createElement('ul');
      children.map(item => {
        return this._menuMap(item);
      }).forEach(item => {
        menuItenUl.appendChild(item);
      });
      menuIten.appendChild(menuItenUl);      
    } else {
      if(disabled){
        menuIten.classList.add('disabled');
      }
      if(border){
        menuIten.classList.add('border');
      }
      if(callback && !disabled){
        menuIten.addEventListener('click', callback.bind(this, this.config.eventCache), false);
        item.target = menuIten;
      }
    }
    return menuIten;
  }

  /**
   * ================================== PUBLIC METHODS ==================================
   */

   // 更新
  update(menu){
    if(!this.config.menuEl) return;
    this.destory();
    this.options.menu = menu;
    this._creatDom();
    this.hide();
  }

  // 销毁
  destory(){
    if(!this.config.menuEl) return;
    this._removeElement(this.config.menuEl);
    this.config.menuEl = null;
    this.config.listEl = null;
    this.config.eventCache = null;
    let removeEvent = item => {
      if(item.children && item.children.length > 0){
        item.children.forEach(item => {
          removeEvent(item);
        })
      } else {
        item.target && item.callback && item.target.removeEventListener('click', item.callback, false);
      }
    }
    this.options.menu.forEach(item => {
      removeEvent(item)
    })
  }

  // 隐藏
  hide(){
    if(!this.config.menuEl) return;
    this.config.menuEl.classList.add('hide');
  }

  /**
   * ================================== HELPER ==================================
   */

  // 删除dom
  _removeElement(el){
    el && el.parentNode && el.parentNode.removeChild(el);
  }

  // 寻找最近父元素
  _closest(el, selector){
    let matchesSelector =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  }

  // 鼠标坐标
  _getMousePos(event){
    var e = event || window.event;    
    return { x: e.clientX, y: e.clientY } 
  }

  // 获取dom样式
  _getStyle(element, property){
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
  
}

window.Contextmenu = Contextmenu;
module.exports = Contextmenu;