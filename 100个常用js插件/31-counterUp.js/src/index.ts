interface Options {
  delay?: number;
  time?: number;
  counterFn?(num?: number, el?: HTMLElement): any;
  startCallback?(num?: number, el?: HTMLElement): any;
  endCallback?(num?: number, el?: HTMLElement): any;
}

interface ElItem {
  el: HTMLElement;
  delay: number;
  from: number;
  to: number;
  time: number;
  number: number;
}

class CounterUp {
  private options: Options;
  private elementArr: ElItem[];

  private constructor(element: string = '.counter', options: Options = {}) {
    this.options = Object.assign({}, CounterUp.DEFAULTS, options);
    this._verifyOptions(this.options);
    this.elementArr = Array.from(document.querySelectorAll(element)).map(
      element => {
        return {
          el: <HTMLElement>element,
          delay:
            +(<HTMLElement>element).dataset.counterDelay ||
            this.options.delay ||
            0,
          from: +(<HTMLElement>element).dataset.counterFrom || 0,
          to: +(<HTMLElement>element).innerHTML || 0,
          time:
            +(<HTMLElement>element).dataset.counterTime ||
            this.options.time ||
            0,
          number: 0
        };
      }
    );
  }

  static get DEFAULTS(): Options {
    return {
      delay: 20,
      time: 1000,
      counterFn: num => num,
      startCallback: num => num,
      endCallback: num => num
    };
  }

  private _init() {
    for (let index = 0; index < this.elementArr.length; index++) {
      const item = this.elementArr[index];
      this._verifyItem(item);
      const pre = Math.ceil((item.to - item.from) / item.time * item.delay);
      item.number = item.from;
      this.options.startCallback(item.number, item.el);
      item.el.innerHTML = this.options.counterFn(item.from, item.el);
      (function animate(self) {
        setTimeout(() => {
          if (item.number < item.to) {
            item.number += pre;
            let nextNum = self.options.counterFn(item.number, item.el);
            item.el.innerHTML = String(nextNum);
            animate(self);
          } else {
            let toNum = self.options.counterFn(item.to, item.el);
            item.el.innerHTML = String(toNum);
            self.options.endCallback(item.to, item.el);
          }
        }, item.delay);
      })(this);
    }
  }

  private _verifyOptions(options: Options) {
    if (typeof options.delay !== 'number') {
      throw new TypeError(`Expect option's delay for number types`);
    }

    if (typeof options.time !== 'number') {
      throw new TypeError(`Expect option's time for number types`);
    }

    if (typeof options.counterFn !== 'function') {
      throw new TypeError(`Expect option's 'counterFn' for function types`);
    }

    if (typeof options.startCallback !== 'function') {
      throw new TypeError(`Expect option's 'startCallback' for function types`);
    }

    if (typeof options.endCallback !== 'function') {
      throw new TypeError(`Expect option's 'endCallback' for function types`);
    }
  }

  private _verifyItem(item: ElItem) {
    if (item.delay <= 0) {
      throw new TypeError(`delay can't less than or equal to 0`);
    }

    if (item.from > item.to) {
      throw new TypeError(
        `from: ${item.from} | to: ${item.to} ==> 'from' can't greater than 'to'`
      );
    }
  }

  public start() {
    this._init();
  }
}

(<any>window).CounterUp = CounterUp;
export default CounterUp;
