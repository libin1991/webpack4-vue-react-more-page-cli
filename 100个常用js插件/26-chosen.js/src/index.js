import './index.scss';
import dom from './dom';
import error from './error';

class Chosen {
  constructor(el, options) {
    this.options = {
      ...Chosen.DEFAULTS,
      ...options,
      placeholder: '',
      original_width: 0
    };

    this.selectEl = el instanceof Element ? el : document.querySelector(el);
    this.optionEl = Array.from(this.selectEl.querySelectorAll('option'));
    this.optionsArr = [];
    this.listeners = [];
    this._selectClick = this._selectClick.bind(this);
    this._resultsClick = this._resultsClick.bind(this);
    this._resultsMouseover = this._resultsMouseover.bind(this);
    this._searchChange = this._searchChange.bind(this);
    this._deselectClick = this._deselectClick.bind(this);
    this._upAndDown = this._upAndDown.bind(this);
    this._closeByDoc = this._closeByDoc.bind(this);
    this._init();
  }

  static get DEFAULTS() {
    return {
      search: true,
      no_results: 'Oops, nothing found!',
      deselect: true,
      width: null
    };
  }

  // 初始化
  _init() {
    this.options.original_width = dom.getStyle(this.selectEl, 'width', true);
    this.selectEl.style.display = 'none';
    this.optionsArr = this.optionEl.map((option, index) => ({
      selected: option.selected,
      disabled: option.disabled,
      index: index,
      text: option.textContent,
      vaule: option.value,
      target: option
    }));
    this.options.placeholder = this.selectEl.dataset.placeholder;
    this._creatDom();
    this._defaultSelected();
    this._eventBind();
  }

  // 默认选择
  _defaultSelected() {
    let selected = this._getSelected();
    if (selected.length === 0){
      this.deselectEl.style.display = 'none';
    } else {
      let index = selected[selected.length - 1].index;
      this._singleResults(index);
      this.deselectEl.style.display = '';
    }
  }

  // 构建DOM
  _creatDom() {
    let width = this.options.width
      ? this.options.width
      : this.options.original_width + 'px';
    let htmlStr = `
      <div class="chosen-container chosen-container-single" style="width: ${width};">
        <a class="chosen-single chosen-default ${
          this.options.deselect ? 'chosen-single-with-deselect' : ''
        }">
          <input class="chosen-search-input" type="text" autocomplete="off">
          <span>${this.options.placeholder}</span>
          ${
            this.options.deselect
              ? '<abbr class="search-choice-close"></abbr>'
              : ''
          }
          <div><b></b></div>
        </a>
        <div class="chosen-drop">
          ${
            this.options.search
              ? '<div class="chosen-search"><input type="text" autocomplete="off" /></div>'
              : ''
          }
          <ul class="chosen-results"></ul>
        </div>
      </div>
    `;
    dom.insertHtml(this.selectEl, 'afterend', htmlStr);
    this.containerEl = this.selectEl.nextElementSibling;
    this.resultsEl = this.containerEl.querySelector('.chosen-results');
    this.singleEl = this.containerEl.querySelector('.chosen-single');
    this.singleResultsEl = this.containerEl.querySelector('.chosen-single span');
    this.singleSearchEl = this.containerEl.querySelector('.chosen-drop input');
    this.deselectEl = this.containerEl.querySelector('.search-choice-close');
  }

  // 事件绑定
  _eventBind() {
    this.singleEl.addEventListener('click', this._selectClick);
    this.resultsEl.addEventListener('mouseover', this._resultsMouseover);
    this.resultsEl.addEventListener('click', this._resultsClick);
    window.addEventListener('keydown', this._upAndDown);
    if (this.options.search) {
      this.singleSearchEl.addEventListener('input', this._searchChange);
    }
    if(this.options.deselect) {
      this.deselectEl.addEventListener('click', this._deselectClick);
    }
    document.addEventListener('click', this._closeByDoc);
    return this;
  }

  // 更新搜索列表
  _resultsUpdate(keyword = '') {
    this.resultsEl.innerHTML = '';
    keyword = keyword.toLowerCase().trim();
    let optionsArr = keyword ? this._search(keyword) : this.optionsArr;
    let liStr = '';
    let wordReg = new RegExp(keyword, 'ig');
    if (optionsArr.length === 0) {
      liStr = `<li class="no-results">${
        this.options.no_results
      } <span>${keyword}</span></li>`;
    } else {
      liStr = optionsArr
        .map((item, index) => {
          return `<li class="${
            item.disabled
              ? 'disabled-result'
              : `active-result${item.selected ? ' result-selected' : ''}`
          }" data-option-array-index="${item.index}" style="">${
            keyword ? item.text.replace(wordReg, $1 => `<em>${$1}</em>`) : item.text
          }</li>`;
        })
        .join('');
    }
    dom.insertHtml(this.resultsEl, 'beforeend', liStr);
    this.resultsChildrenEl = Array.from(this.resultsEl.children);
    return this;
  }

  _search(keyword) {
    return this.optionsArr.filter(item =>
      item.text.toLowerCase().includes(keyword)
    );
  }

  // 点击弹出列表
  _selectClick() {
    this._resultsUpdate();
    if (dom.hasClass(this.containerEl, 'chosen-container-active')) {
      this._openDrop(false);
    } else {
      this._openDrop(true);
    }
    return this;
  }

  // 弹出列表
  _openDrop(type) {
    let selected = this._getSelected();
    if (type) {
      dom.addClass(this.containerEl, 'chosen-with-drop');
      dom.addClass(this.containerEl, 'chosen-container-active');
      this.options.search && this.singleSearchEl.focus();
      if (selected.length === 0) return;
      selected.forEach(item => {
        dom.addClass(this.resultsEl.children[item.index], 'highlighted');
      });
    } else {
      dom.removeClass(this.containerEl, 'chosen-with-drop');
      dom.removeClass(this.containerEl, 'chosen-container-active');
      this.options.search && (this.singleSearchEl.value = '');
      this.resultsChildrenEl.forEach(item => {
        dom.removeClass(item, 'highlighted');
      });
    }
    return this;
  }

  // 点击列表
  _resultsClick(e) {
    let target = e.target;
    if (
      target.nodeName.toLowerCase() == 'li' &&
      !dom.hasClass(target, 'disabled-result')
    ) {
      let index = target.dataset.optionArrayIndex;
      this._singleResults(index);
      this._openDrop(false);
      this.deselectEl.style.display = '';
      this._triggerChange();
    }
    return this;
  }

  // 点击列表
  _singleResults(index) {
    this.optionsArr.forEach(item => (item.selected && (item.selected = false)));
    this.optionsArr[index].selected = true;
    this.singleResultsEl.innerHTML = this.optionsArr[index].text;
    dom.removeClass(this.singleEl, 'chosen-default');
    if (!this.resultsChildrenEl) return;
    this.resultsChildrenEl.forEach(item => {
      if(dom.hasClass(item, 'result-selected')){
        dom.removeClass(item, 'result-selected');
      }
    });
    dom.addClass(this.optionsArr[index].target, 'result-selected');
  }

  // 列表鼠标经过
  _resultsMouseover(e) {
    let target = e.target;
    if (
      target.nodeName.toLowerCase() == 'li' &&
      !dom.hasClass(target, 'disabled-result')
    ) {
      this.resultsChildrenEl.forEach(item => {
        if(dom.hasClass(item, 'highlighted')){
          dom.removeClass(item, 'highlighted');
        }
      });
      dom.addClass(target, 'highlighted');
    }
  }

  _searchChange(e) {
    let keyword = e.target.value;
    this._resultsUpdate(keyword);
    return this;
  }

  _upAndDown(e) {
    if (dom.hasClass(this.containerEl, 'chosen-container-active')) {
      let keyCode = e.keyCode;
      let currentEl = this.resultsChildrenEl.filter(item => dom.hasClass(item, 'highlighted'))[0];
      let currentIndex = this.resultsChildrenEl.indexOf(currentEl);
      if(keyCode === 38){
        while (currentIndex > 0) {
          if(!dom.hasClass(this.resultsChildrenEl[--currentIndex], 'disabled-result')){
            this._upAndDownUpdate(currentIndex);
            this._upAndDownScroll(currentIndex, keyCode);
            break;
          }
        }
      } else if(keyCode === 40){
        while (currentIndex < this.resultsChildrenEl.length - 1) {
          if(!dom.hasClass(this.resultsChildrenEl[++currentIndex], 'disabled-result')){
            this._upAndDownUpdate(currentIndex);
            this._upAndDownScroll(currentIndex, keyCode);
            break;
          }
        }
      } else if(keyCode === 13){
        let enterEl = this.resultsChildrenEl[currentIndex];
        if(enterEl) {
          this._singleResults(enterEl.dataset.optionArrayIndex);
          this._openDrop(false);
          this.deselectEl.style.display = '';
          this._triggerChange();
        }
      }
    }
    return this;
  }

  _upAndDownUpdate(index){
    this.resultsChildrenEl.forEach(item => {
      if(dom.hasClass(item, 'highlighted')){
        dom.removeClass(item, 'highlighted');
      }
    });
    dom.addClass(this.resultsChildrenEl[index], 'highlighted');
  }

  _upAndDownScroll(index, keyCode){
    let resultsHeight = dom.getStyle(this.resultsEl, 'height', true);
    let optionHeight = dom.getStyle(this.resultsChildrenEl[0], 'height', true);
    if(resultsHeight < optionHeight * this.resultsChildrenEl.length){
      let currentEl = this.resultsChildrenEl[index];
      let currentTop = optionHeight * (index + 1);
      if(keyCode === 38){
        if(currentTop > resultsHeight){
          this.resultsEl.scrollTo(0, currentTop - optionHeight);
        } else {
          this.resultsEl.scrollTo(0, 0);
        }
      } else if(keyCode === 40){
        if(currentTop > resultsHeight){
          this.resultsEl.scrollTo(0, currentTop - resultsHeight);
        }
      }
    }
  }

  _deselectClick(e) {
    e.stopPropagation();
    dom.addClass(this.singleEl, 'chosen-default');
    this.deselectEl.style.display = 'none';
    this.singleResultsEl.innerHTML = this.options.placeholder;
    this.optionsArr.forEach(item => (item.selected && (item.selected = false)));
    this._resultsUpdate();
    this._triggerChange();
    return this;
  }

  _getSelected() {
    return this.optionsArr.filter(item => item.selected);
  }

  _triggerChange() {
    let selected = this._getSelected();
    this.listeners.forEach(cb => cb(selected[0] || {}));
    return this;
  }

  _closeByDoc(e){
    let chosen = dom.closest(e.target, '.chosen-container');
    if(!chosen && dom.hasClass(this.containerEl, 'chosen-container-active')) this._openDrop(false);
  }

  change(callback) {
    error(
      typeof callback !== 'function',
      `The change function parameter required function type, but get ${typeof callback}`
    );
    this.listeners.push(callback);
    return this;
  }

  value() {
    return this._getSelected()[0] || {};
  }

  destroy() {
    this.selectEl.style.display = '';
    this.singleEl.removeEventListener('click', this._selectClick);
    this.resultsEl.removeEventListener('mouseover', this._resultsMouseover);
    this.resultsEl.removeEventListener('click', this._resultsClick);
    window.removeEventListener('keydown', this._upAndDown);
    if (this.options.search) {
      this.singleSearchEl.removeEventListener('input', this._searchChange);
    }
    if(this.options.deselect) {
      this.deselectEl.removeEventListener('click', this._deselectClick);
    }
    document.removeEventListener('click', this._closeByDoc);
    dom.removeElement(this.containerEl);
  }
}

window.Chosen = Chosen;
module.exports = Chosen;
