import './index.scss';

class Pagination {
  constructor(el = '.paginate-container', options) {
    this.options = {
      ...Pagination.DEFAULTS,
      ...options
    };

    this.config = {
      el: el,
      containerEl: el instanceof Element ? el : document.querySelector(el),
      paginationEl: null,
      list: [],
      clickList: []
    };

    this._eventCache = e => {
      e.preventDefault();
      let nextPage;
      let type = e.target.dataset.type;
      switch(type){
        case 'previous':
          nextPage = this.options.current - 1;
        break;
        case 'page':
          nextPage = e.target.dataset.pageNum;
        break;
        case 'next':
          nextPage = this.options.current + 1;
        break;
      }
      e.pagination = {
        prePage: this.options.current,
        nextPage: Number(nextPage)
      };
      this.options.callback(e)
    }

    this._validate();
    this._init();
  }

  static get DEFAULTS() {
    return {
      current: 1,
      total: 1,
      show: 1,
      previous: 'Previous',
      next: 'Next',
      callback: new Function
    };
  }

  _init() {
    this._markArray();
    this._creatDom();
    this._eventBind();
  }

  /**
   * ================================== PRIVATE METHODS ==================================
   */

  _validate(){
    let current = this.options.current;
    let total = this.options.total;
    let show = this.options.show;
    if(typeof current !== 'number' || typeof total !== 'number' || typeof show !== 'number'){
      throw new TypeError(`current | total | show: required 'number' type`);
    } else if(current <= 0 || total <= 0 || show <= 0){
      throw new TypeError(`current | total | show: required greater than 0`);
    } else if(current > total){
      this.options.current = total;
    } else if(show > total){
      this.options.show = total;
    } else if(typeof this.options.previous !== 'string' || typeof this.options.next !== 'string'){
      throw new TypeError(`previous | next: required 'string' type`);
    } else if(typeof this.options.callback !== 'function'){
      throw new TypeError(`callback: required 'function' type`);
    }
  }

  _markArray(){
    let current = this.options.current;    
    let total = this.options.total;    
    let show = this.options.show;
    let showLeft = Math.ceil(show / 2);
    let showRight = parseInt(show / 2);
    
    // 上一页
    this.config.list.push({
      type: 'previous',
      disabled: current === 1
    });

    // 靠左时
    if(current <= showLeft){
      this.config.list = [...this.config.list, ...this._creatPage(1, show)];
      if(show < total){
        this.config.list.push({
          type: 'gap'
        })
      }
    }

    // 靠中间时
    if(current > showLeft && (current + showRight) <= total){
      let start = current - showLeft;
      let end = current + showRight;
      if(start > 0){
        this.config.list.push({
          type: 'gap'
        })
      }
      this.config.list = [...this.config.list, ...this._creatPage(start + 1, end)];
      if((start + show) < total){
        this.config.list.push({
          type: 'gap'
        })  
      }
    }

    // 靠右时
    if((current + showRight) > total){
      if(show < total){
        this.config.list.push({
          type: 'gap'
        })
      }
      let start = total - show;
      this.config.list = [...this.config.list, ...this._creatPage(start + 1, total)];
    }

    // 下一页
    this.config.list.push({
      type: 'next',
      disabled: current === total
    });
  }

  _creatPage(start, end){
    let i = 0;
    let list = [];
    let length = end - start;
    while(i <= length){
      list.push({
        type: 'page',
        num: start + i++,
        current: this.options.current === (start + i - 1)
      })
    }
    return list;
  }

  _creatDom(){
    this.config.paginationEl = document.createElement('div');
    this.config.paginationEl.classList.add('pagination');
    this.config.list.forEach(item => {
      switch(item.type){
        case 'previous':
          if(item.disabled){
            this.config.paginationEl.insertAdjacentHTML('beforeend', `<span class="previous disabled">${this.options.previous}</span>`);
          } else {
            this.config.paginationEl.insertAdjacentHTML('beforeend', `<a href="#" class="previous" data-type="previous">${this.options.previous}</a>`);
          }
        break;
        case 'gap':
          this.config.paginationEl.insertAdjacentHTML('beforeend', `<span class="gap">…</span>`);
        break;
        case 'page':
          if(item.current){
            this.config.paginationEl.insertAdjacentHTML('beforeend', `<em class="current">${item.num}</em>`);
          } else {
            this.config.paginationEl.insertAdjacentHTML('beforeend', `<a href="#" data-type="page" data-page-num="${item.num}">${item.num}</a>`);
          }
        break;
        case 'next':
          if(item.disabled){
            this.config.paginationEl.insertAdjacentHTML('beforeend', `<span class="next disabled">${this.options.next}</span>`);
          } else {
            this.config.paginationEl.insertAdjacentHTML('beforeend', `<a href="#" class="next" data-type="next">${this.options.next}</a>`);
          }
        break;
      }
    });
    this.config.containerEl.appendChild(this.config.paginationEl); 
  }

  _eventBind(){
    this.config.clickList = [].slice.call(this.config.containerEl.querySelectorAll('a'));
    this.config.clickList.forEach(item => {
      item.addEventListener('click', this._eventCache, false)
    })
  }

  /**
   * ================================== PUBLIC METHODS ==================================
   */

  set(type, arg){
    let keyList = Object.keys(this.options);
    if(!keyList.includes(type)){
      throw new TypeError(`The set function's first argument can only be one of: ${keyList.join(', ')}`);
    }
    this.options[type] = arg;
    this._validate();
    this.destory(true);
    this._init();
    return this;
  }

  destory(type){
    this.config.clickList.forEach(item => {
      item.removeEventListener('click', this._eventCache, false)
    });
    this.config.list = [];
    this.config.clickList = [];
    if(type){
      this._removeElement(this.config.paginationEl);
      this.config.paginationEl = null;
    }
  }

  /**
   * ================================== HELPER ==================================
   */

  // 删除dom
  _removeElement(el){
    el && el.parentNode && el.parentNode.removeChild(el);
  }
}

window.Pagination = Pagination;
module.exports = Pagination;