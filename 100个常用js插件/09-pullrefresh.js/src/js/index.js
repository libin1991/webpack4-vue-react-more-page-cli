import listen from 'good-listener';

class Pullrefresh {
  constructor(options) {
    //验证参数
    if (typeof options === 'undefined') {
      throw new TypeError('Pullrefresh required `options`.');
    } else if (typeof options.container === 'undefined') {
      throw new TypeError('Pullrefresh required `container` option.');
    }

    //合并参数
    this.options = {
      ...Pullrefresh.DEFAULTS,
      ...options
    };

    //获取元素
    if (this.options.container instanceof Element) {
      this.options.container = options.target;
    } else {
      this.options.container = document.querySelectorAll(this.options.container)[0];
    }

    //事件列表
    this.listeners = [];

    //插件配置
    this.config = {
      className: '__pr__',
      state: '',
      startX: 0,
      startY: 0
    };

    //修改事件this
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);

    //初始化
    this._init();
  }

  //默认参数
  static get DEFAULTS() {
    return {
      pullText: 'Pull down to refresh',
      dropText: 'Release to refresh',
      loadingText: 'Refreshing',
      loadDistance: 200,
      onRefresh: new Function()
    };
  }

  //初始化
  _init() {
    if (!this._isMobile()) return;
    this._createDom();
    this._eventBind();
  }

  //创建Dom
  _createDom() {
    document.body.classList.add(this.config.className + 'wrap');
    this.options.container.classList.add(this.config.className + 'container');
    document.body.insertAdjacentHTML('afterBegin', '<div class="' + this.config.className + 'symbol"><div class="' + this.config.className + 'msg"></div></div>');
    this.config.symbolDom = document.querySelectorAll('.' + this.config.className + 'symbol')[0];
    this.config.msgDom = document.querySelectorAll('.' + this.config.className + 'msg')[0];
  }

  //绑定事件
  _eventBind() {
    this._listen(document.body, 'touchstart', this._onTouchStart);
    this._listen(document.body, 'touchmove', this._onTouchMove);
    this._listen(document.body, 'touchend', this._onTouchEnd);
  }

  //触摸开始
  _onTouchStart(e) {
    this._setState('pulling');
    this.config.msgDom.textContent = this.options.pullText;
    let targetEvent = e.changedTouches[0];
    this.config.startX = targetEvent.clientX;
    this.config.startY = targetEvent.clientY;
  }

  //触摸移动
  _onTouchMove(e) {
    let targetEvent = e.changedTouches[0];
    let x = targetEvent.clientX;
    let y = targetEvent.clientY;
    let diffX = x - this.config.startX;
    let diffY = y - this.config.startY;
    this._onPullDownMove(this.config.startY, y);
    if(diffY >= this.options.loadDistance){
      this.config.msgDom.textContent = this.options.dropText;
    } else {
      this.config.msgDom.textContent = this.options.pullText;
    }
  }

  //触摸停止
  _onTouchEnd(e) {
    this._setState('release');
    let targetEvent = e.changedTouches[0];
    let x = targetEvent.clientX;
    let y = targetEvent.clientY;
    let diffX = x - this.config.startX;
    let diffY = y - this.config.startY;
    if (diffY >= this.options.loadDistance) {
      this._onPullDownRefresh();
    } else {
      this._setChange(0);
      this._setState('reset');
    }
  }

  //下拉动作
  _onPullDownMove(startY, y) {
    event.preventDefault();
    if (this.config.state !== 'pulling') return false;
    let diff = y - startY < 0 ? 0 : y - startY;
    this._setChange(this._easing(diff));
  }

  //刷新动作
  _onPullDownRefresh() {
    this._setState('refresh');
    this.config.msgDom.textContent = this.options.loadingText;
    this._setChange(50);
    this._wait(1000).then(() => {
      this._setChange(0);
      this._setState('reset');
      this.config.msgDom.textContent = '';
      this.options.onRefresh();
    })
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  //销毁插件
  destory() {
    this.listeners.map(listener => {
      listener.destroy();
    });
    document.body.classList.remove('__pr__wrap');
    this.options.container.classList.remove('__pr__container');
    this.config.symbolDom.innerHTML = '';
  }

  /**
  * ================================== HELPER ==================================
  */

  //设置移动距离
  _setChange(pullHeight) {
    let lbodyTop = pullHeight !== 0 ? 'translate3d(0, ' + pullHeight + 'px, 0)' : '';
    let symbolTop = pullHeight - 50 > 0 ? pullHeight - 50 : 0;
    let lSymbol = symbolTop !== 0 ? 'translate3d(0, ' + symbolTop + 'px, 0)' : '';
    this.options.container.style.WebkitTransform = lbodyTop;
    this.options.container.style.transform = lbodyTop;
    this.config.symbolDom.style.WebkitTransform = lSymbol;
    this.config.symbolDom.style.transform = lSymbol;
  }

  //设置插件状态
  _setState(state) {
    this.config.state = state;
    document.body.className = this.config.className + 'wrap';
    document.body.classList.add(this.config.className + state);
  }

  //可移动最大距离
  _easing(distance) {
    let t = distance;
    let b = 0;
    let d = screen.availHeight;
    let c = d / 4;
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }

  //是否手机
  _isMobile() {
    return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
  }

  //延迟执行
  _wait(time) {
    return new Promise(resolve => setTimeout(resolve, time ? time : 0));
  }

  //监听器
  _listen(el, type, event) {
    this.listeners.push(listen(el, type, event));
  }
}

window.Pullrefresh = Pullrefresh;
module.exports = Pullrefresh;
