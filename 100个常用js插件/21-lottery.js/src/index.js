import './index.scss';
import dom from './dom.js';

class Lottery {
  constructor(el = '.lottery', options) {
    this.options = {
      ...Lottery.DEFAULTS,
      ...options
    };

    this.config = {
      containerEl: el instanceof Element ? el : document.querySelector(el),
      items: [],
      itemsLength: 0,
      current: -1,
      prize: null,
      disabled: false,
      beginTime: 0,
      currentSpeed: 200,
    }

    this._init();
  }

  static get DEFAULTS() {
    return {
      items: '.item',
      time: 5000,
      begin: new Function, 
      end: new Function
    };
  }

  _init(){
    dom.addClass(this.config.containerEl, '__lottery__');
    this.config.items = dom.find(this.config.containerEl, this.options.items);
    this.config.itemsLength = this.config.items.length;
    if(this.config.itemsLength === 0){
      throw new TypeError(`Unable to find items dom`);
    }
    if(this.options.time < 5000){
      throw new TypeError(`options time(${this.options.time}) can\'t be less than 5000`);
    }
  }

  _begin(){
    this.options.begin();
    this.config.beginTime = new Date().getTime();
    dom.addClass(this.config.containerEl, '__lottery__processing');
    return this;
  }

  _animate(step){
    this._itemClass(++this.config.current);

    // 时间差
    let taketime = new Date().getTime() - this.config.beginTime;

    // 两秒加速
    if(taketime < 2000){
      this.config.currentSpeed -= 6;
    }

    // 三秒减速
    if(taketime >= this.options.time - 3000 && taketime < this.options.time){
      this.config.currentSpeed += 6;
    }

    // 结束
    if(taketime >= this.options.time){
      this._location();
    } else {
      setTimeout(() => {
        this._animate();
      }, this.config.currentSpeed);
    }
  }

  _location(){
    this.config.spaceStep = this.config.prize - this.config.current;
    if(this.config.spaceStep === 0){
      setTimeout(() => {
        this._end();
      }, this.config.currentSpeed)
    } else if(this.config.spaceStep > 0){
      this._animateStep();
    } else {
      this.config.spaceStep = this.config.itemsLength - this.config.current + this.config.prize;
      this._animateStep();
    }
  }

  _animateStep(){
    setTimeout(() => {
      this._itemClass(++this.config.current);
      this.config.spaceStep -= 1;
      if(this.config.spaceStep === 0){
        this._end();
      } else {
        this._animateStep();
      }
    }, this.config.currentSpeed);
  }

  _itemClass(index){
    console.log(index)
    this.config.items.forEach(item => dom.removeClass(item, '__lottery__active'));
    dom.addClass(this.config.items[index], '__lottery__active');
    if(this.config.current === this.config.itemsLength - 1){
      this.config.current = -1;
    }
  }

  _end(){
    this.config.beginTime = 0;
    this.config.current = -1;
    dom.removeClass(this.config.containerEl, '__lottery__processing');
    this.disabled(false);
    this.options.end(this.config.prize);
    return this;
  }

  prize(index){
    if(typeof index !== 'number'){
      throw new TypeError(`Expected number type, but get ${typeof index}`);
    }

    if(index < 0 || index > this.config.itemsLength - 1){
      throw new TypeError(`Expected number greater than 0 and Less than ${this.config.itemsLength - 1};`);
    }
    if(this.config.disabled) return this;
    this.config.prize = index;
    return this;
  }

  start(){
    if(!this.config.prize){
      throw new TypeError(`Please pass prize function a numeric parameter first`);
    }
    if(this.config.disabled) return this;
    this._begin();
    this.disabled(true);
    this._animate();
    return this;
  }

  disabled(type){
    this.config.disabled = type;
    if(type){
      dom.addClass(this.config.containerEl, '__lottery__disabled');
    } else {
      dom.removeClass(this.config.containerEl, '__lottery__disabled');
    }
    return this;
  }
}

window.Lottery = Lottery;
module.exports = Lottery;