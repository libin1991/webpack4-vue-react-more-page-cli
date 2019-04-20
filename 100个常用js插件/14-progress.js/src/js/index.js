class Progress {
  constructor() {
    this.options = {
      parent: 'body',
      speed: 300,
      delay: 500,
      template: '<div id="progress"><div class="bar"></div></div>',
      getPercent: new Function,
    };

    this.config = {
      parentDom: null,
      progressDom: null,
      barDom: null,
      percent: 0,
      maxRandomStep: 5,
      overDelay: 1000,
      timer: null,
    }
  }

  /**
  * ================================== PRIVATE METHODS ==================================
  */

  _creatDom(){
    if(this._isRendered()) return;
    this.config.parentDom = document.querySelector(this.options.parent);
    this.config.parentDom.insertAdjacentHTML('beforeend', this.options.template);
    this.config.progressDom = document.getElementById('progress');
    this.config.barDom = this.config.progressDom.querySelector('.bar');
    this.config.barDom.style.transition = `all ${this.options.speed}ms ease`;
  }

  _isRendered(){
    return !!document.getElementById('progress');
  }

  _animate(percent = 0, type){
    percent = this._clamp(percent, 0, 1) * 100;
    if(type){
      clearTimeout(this.config.timer);
      this.config.barDom.style.width = this.config.percent + '%';
      this.config.percent = type === 'set' ? percent : (this.config.percent + percent);
    } else {
      this.config.percent += Math.floor(Math.random() * this.config.maxRandomStep + 1);
    }
    this._update();
  }

  _update(){
    if(this.config.percent > 99) {
      clearTimeout(this.config.timer);
      this._setPercent(99);
    } else {
      this.config.timer = window.setTimeout(() => {
        this._setPercent(this.config.percent);
        this._animate();
      }, this.options.delay);
    }
  }

  _setPercent(val){
    this.config.percent = val;
    this.options.getPercent(val);
    this.config.barDom.style.width = val + '%';
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  configure(options){
    this.options = {
      ...this.options,
      ...options
    };
  }

  start(){
    if(this._isRendered()) return;
    this._creatDom();
    this._animate();
  }

  set(percent){
    this._creatDom();
    this._animate(percent, 'set');
  }

  inc(percent){
    this._creatDom();
    this._animate(percent, 'inc');
  }

  setColor(val){
    this.config.barDom.style.backgroundColor = val;
  }

  done(){
    if(!this._isRendered()) return;
    clearTimeout(this.config.timer);
    this._setPercent(100);
    this.config.progressDom.classList.add('hide');
    window.setTimeout(() => {
      this._setPercent(0);
      this._removeElement(this.config.progressDom);
    }, 500);
  }

  /**
  * ================================== HELPER ==================================
  */

  _removeElement(el) {
    el && el.parentNode && el.parentNode.removeChild(el);
  }

  _clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  };

}

window.Progress = new Progress();
module.exports = new Progress();
