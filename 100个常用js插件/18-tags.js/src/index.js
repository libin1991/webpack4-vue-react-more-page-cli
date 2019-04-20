import './index.scss';
import listen from './listener.js';

class Tags {
  constructor(el = '.tags-container', options) {
    this.options = {
      ...Tags.DEFAULTS,
      ...options
    };

    this.config = {
      containerEl: el instanceof Element ? el : document.querySelector(el),
      addEl: null,
      inputEl: null,
      tags: [],
      events: []
    };

    this._init()
  }

  static get DEFAULTS() {
    return {
      default: [],
      closable: false,
      filter: val => val,
      init: new Function,
      add: new Function,
      remove: new Function,
    };
  }

  _init() {
    this.config.containerEl.classList.add('__tags__');
    if(this.options.default.length > 0){
      let tagList = '';
      let i = -1;
      while(++i < this.options.default.length){
        tagList += `<span class="tag">${this.options.default[i]}${this.options.closable ? `<i data-role="remove"></i>` : ``}</span>`;
      }
      this.config.containerEl.insertAdjacentHTML('beforeend', tagList);
    }
    this.config.containerEl.insertAdjacentHTML('beforeend', `<span class="tag add">+ 新增标签</span><input class="tag input">`);
    this.config.addEl = this.config.containerEl.querySelector('.add');
    this.config.inputEl = this.config.containerEl.querySelector('.input');
    this.config.tags = this.options.default.slice();
    this.options.init.call(this, this.config.tags);
    this._eventBind();
  }

  /**
   * ================================== PRIVATE METHODS ==================================
   */

  _eventBind(){
    this.config.events[this.config.events.length] = listen(this.config.addEl, 'click', e => {
      this.config.containerEl.classList.add('add-tag');
      this.config.inputEl.focus();
    });

    this.config.events[this.config.events.length] = listen(this.config.inputEl, 'blur', e => {
      this._inputTag();
    });

    this.config.events[this.config.events.length] = listen(this.config.inputEl, 'keyup', e => {
      let code = e.charCode || e.keyCode;
      if(code === 13 || code === 9){
        this.config.inputEl.blur();
      }
    });

    this.config.events[this.config.events.length] = listen(this.config.containerEl, 'click', e => {
      let target = e.target;
      let parentNode = target.parentNode;
      if(target.getAttribute('data-role') === 'remove'){
        let tagList = [].slice.call(this.config.containerEl.querySelectorAll('.tag'));
        let index = tagList.indexOf(parentNode);
        let value = this.config.tags[index];
        this.config.tags.splice(index, 1);
        this._removeElement(parentNode);
        this.options.remove.call(this, this.config.tags, value);
      }
    })
  }

  _inputTag(){
    this.config.containerEl.classList.remove('add-tag');
    let value = this.config.inputEl.value.trim();
    let newValue = this.options.filter(value, this.config.tags.length);
    this.config.inputEl.value = '';
    if(!newValue || this.config.tags.includes(newValue)) return;
    this.config.tags.push(newValue);
    this.config.addEl.insertAdjacentHTML('beforebegin', `<span class="tag">${newValue}${this.options.closable ? `<i data-role="remove"></i>` : ``}</span>`);
    this.options.add.call(this, this.config.tags, newValue);
  }

  /**
   * ================================== PUBLIC METHODS ==================================
   */

  destroy(type){
    this.config.events.forEach(item => {
      item.destroy();
    });
    if(type){
      this.config.containerEl.classList.remove('__tags__');
      this.config.containerEl.innerHTML = '';
    }
  }

  getTags(){
    return this.config.tags;
  }

  /**
   * ================================== HELPER ==================================
   */

  // 删除dom
  _removeElement(el){
    el && el.parentNode && el.parentNode.removeChild(el);
  }

}

window.Tags = Tags;
module.exports = Tags;