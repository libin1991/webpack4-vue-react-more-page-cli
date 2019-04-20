class Typing {
  constructor(el = '.typing', options) {

    if (!options || !(options.strings instanceof Array)) {
      throw new TypeError('strings required Array type');
    } else if (options.strings.length === 0) {
      throw new TypeError('The strings length can not be 0');
    }

    this.options = {
      ...Typing.DEFAULTS,
      ...options
    };

    this.config = {
      el: el instanceof Element ? el : document.querySelector(el),
      cursor: {},
      play: true,
      back: false,
      destory: false,
      typingIndex: 0,
      stringsIndex: 0,
      string: '',
      time: 0
    };

    this.textCache = this.config.el.textContent;

    this._init();
  }

  static get DEFAULTS() {
    return {
      strings: [''],
      typeSpeed: 60,
      backSpeed: 30,
      startDelay: 500,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      onFinished: new Function()
    };
  }

  _init() {
    this._cursor();
    this._update();
    this._animate();
  }

  //创建光标
  _cursor(){
    if(!this.options.showCursor || !this.options.cursorChar) return;
    this.config.el.insertAdjacentHTML('afterEnd', `<span class="typing-cursor">${this.options.cursorChar}</span>`);
    this.config.cursor = this.config.el.parentNode.querySelector(`.typing-cursor`);

    (function flash(self, time) {
      self._wait(time).then(() => {
        self.config.cursor.style.visibility = 'hidden';
        self._wait(time).then(() => {
          self.config.cursor.style.visibility = 'visible';
          flash(self, time);
        });
      });
    })(this, 500);

  }

  //循环动画
  _animate(){
    if(!this.config.play || this.config.destory) return;
    this._wait(this.options.typeSpeed).then(() => {
      this._update();
      this._animate();
    });
  }

  //动画规则
  _update(){
    if(this.config.stringsIndex === 0){
      this.config.back = false;
      this._delay(this.options.startDelay);
    } else if(this.config.stringsIndex === this.options.strings[this.config.typingIndex].length) {
      let strings = this.options.strings;
      let stringsLength = strings.length;
      if(!this.options.loop && (this.config.typingIndex === strings.length - 1) && (this.config.stringsIndex === strings[stringsLength - 1].length)){
        this.config.play = false;
        if(typeof this.options.onFinished === 'function'){
          this.options.onFinished(this.config.typingIndex, this.config.stringsIndex);
        }
        return;
      }
      this.config.back = true;
      this._delay(this.options.backDelay);
    } else {
      this._delay(0);
    }
  }

  //动画延迟，用于开始和结束状态
  _delay(time){
    this.config.play = false;
    this._wait(time).then(() => {
      if(this.config.destory) return;
      this.config.play = true;
      if(this.config.back){
        this.config.string = this.config.string.substring(0, this.config.string.length - 1);
        --this.config.stringsIndex;
        if(this.config.stringsIndex === 0){
          ++this.config.typingIndex;
          if(this.config.typingIndex === this.options.strings.length){
            this.config.typingIndex = 0;
          }
        }
      } else {
        this.config.string += this.options.strings[this.config.typingIndex].charAt(this.config.stringsIndex);
        ++this.config.stringsIndex;
      }
      this.config.el.textContent = this.config.string;
      this._animate();
    });
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  destory() {
    if(this.config.destory) return;
    this.config.play = false;
    this.config.destory = true;
    this.options.showCursor && this.config.cursor.parentNode.removeChild(this.config.cursor);
    this.config.el.textContent = this.textCache;
  }

  /**
  * ================================== HELPER ==================================
  */

  _wait(time) {
    return new Promise(resolve => setTimeout(resolve, time || 0));
  }
}

window.Typing = Typing;
module.exports = Typing;
