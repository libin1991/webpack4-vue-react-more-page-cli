import './index.scss';
import listen from './listener.js';
import dom from './dom.js';

class OnePageScroll {
  constructor(el = '.onepage-wrapper', options) {
    this.options = {
      ...OnePageScroll.DEFAULTS,
      ...options
    };

    this.config = {
      containerEl: el instanceof Element ? el : document.querySelector(el),
      sectionsEl: [],
      paginationsEl: [],
      events: [],
      pageView: 1
    };

    this._scrollEvent = this._scrollEvent.bind(this);
    this._init();
  }

  static get DEFAULTS() {
    return {
      sectionContainer: 'section',
      easing: 'ease',
      animationTime: 1000,
      pagination: true,
      keyboard: true,
      beforeMove: new Function(),
      afterMove: new Function(),
      loop: true
    };
  }

  _init() {
    this.config.containerEl.classList.add('onepage-wrapper');
    this.config.containerEl.style.position = 'relative';
    this.config.sectionsEl = dom.find(
      this.config.containerEl,
      this.options.sectionContainer
    );
    this.config.sectionsEl.map((el, index) => {
      el.classList.add('ops-section');
      el.setAttribute('data-index', index + 1);
    });
    this.options.pagination && this._pagination();    
    this._activeClass();
    this._eventBind();
  }

  /**
   * ================================== PRIVATE METHODS ==================================
   */

  _eventBind() {
    this.config.events[this.config.events.length] = listen(
      document,
      'mousewheel',
      this._scrollEvent
    );
    this.config.events[this.config.events.length] = listen(
      document,
      'DOMMouseScroll',
      this._scrollEvent
    );
    if (this.options.keyboard) {
      this.config.events[this.config.events.length] = listen(
        document,
        'keyup',
        e => {
          let tag = e.target.tagName.toLowerCase();
          switch (e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') this._keyup(false);
              break;
            case 40:
              if (tag != 'input' && tag != 'textarea') this._keyup(true);
              break;
            default:
              return;
          }
        }
      );
    }
  }

  _pagination(){
    let pageSize = this.config.sectionsEl.length;
    let pagination = document.createElement('ul'); 
    pagination.classList.add('onepage-pagination');
    let i = -1;
    let html = '';
    while(++i < pageSize){
      html += `<li><a data-index="${i + 1}" href="#${i + 1}"></a></li>`
    }
    pagination.insertAdjacentHTML('beforeend', html);
    document.body.appendChild(pagination);
    this.config.paginationsEl = dom.find(pagination, 'a');
    this.config.paginationsEl.map(el => {
      this.config.events[this.config.events.length] = listen(
        el,
        'click',
        e => {
          e.preventDefault();
          let page = e.target.dataset.index;
          this.config.pageView = Number(page);
          this._activeClass();          
          let pos = this.config.pageView === 1 ? 0 : -((this.config.pageView - 1) * 100);
          this._setStyle(pos);
        }
      );
    })
  }

  _keyup(scrolDown) {
    let pos = this._getPos(scrolDown);
    this._setStyle(pos);
  }

  _scrollEvent(event) {
    event.preventDefault();
    let delta = event.wheelDelta || -event.detail;
    let scrolDown = Math.sign(delta) === -1;
    let pos = this._getPos(scrolDown);
    this._setStyle(pos);
  }

  _setStyle(pos) {
    let transformCSS =
      '-webkit-transform: translate3d(0, ' +
      pos +
      '%, 0); -webkit-transition: -webkit-transform ' +
      this.options.animationTime +
      'ms ' +
      this.options.easing +
      '; -moz-transform: translate3d(0, ' +
      pos +
      '%, 0); -moz-transition: -moz-transform ' +
      this.options.animationTime +
      'ms ' +
      this.options.easing +
      '; -ms-transform: translate3d(0, ' +
      pos +
      '%, 0); -ms-transition: -ms-transform ' +
      this.options.animationTime +
      'ms ' +
      this.options.easing +
      '; transform: translate3d(0, ' +
      pos +
      '%, 0); transition: transform ' +
      this.options.animationTime +
      'ms ' +
      this.options.easing +
      ';';
    this.config.containerEl.style.cssText = transformCSS;
    let transitionEnd = this._whichTransitionEvent();
    let transitionEndEvent = listen(
      this.config.containerEl,
      transitionEnd,
      e => {
        if (typeof this.options.afterMove == 'function') {
          this.options.afterMove(this.config.pageView);
          transitionEndEvent.destroy();
        }
      }
    );
  }

  _getPos(scrolDown) {
    let pageSize = this.config.sectionsEl.length;
    if (typeof this.options.beforeMove == 'function') {
      this.options.beforeMove(this.config.pageView);
    }
    if (scrolDown) {
      if (this.config.pageView < pageSize) {
        this.config.pageView += 1;
      } else if (this.config.pageView === pageSize && this.options.loop) {
        this.config.pageView = 1;
      }
    } else {
      if (this.config.pageView === 1 && this.options.loop) {
        this.config.pageView = pageSize;
      } else if (1 < this.config.pageView) {
        this.config.pageView -= 1;
      }
    }
    this._activeClass();
    return this.config.pageView === 1 ? 0 : -((this.config.pageView - 1) * 100);
  }

  _activeClass() {
    this.config.paginationsEl.map(el => el.classList.remove('active'));
    this.config.sectionsEl.map(el => el.classList.remove('active'));
    this.config.sectionsEl[this.config.pageView - 1].classList.add('active');
    this.config.paginationsEl[this.config.pageView - 1].classList.add('active');
    document.body.className = document.body.className.replace(
      /\bviewing-page-\d.*?\b/g,
      ''
    );
    document.body.classList.add('viewing-page-' + this.config.pageView);
  }

  _whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  /**
   * ================================== PUBLIC METHODS ==================================
   */

  destroy() {
    this.config.events.map(event => event.destroy());
  }

  /**
   * ================================== HELPER ==================================
   */
}

window.OnePageScroll = OnePageScroll;
module.exports = OnePageScroll;
