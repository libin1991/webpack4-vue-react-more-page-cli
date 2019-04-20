interface Options {
  rootMargin?: string;
  threshold?: number;
  animateClassName?: string;
  selector?: string;
  once?: boolean;
}

class ScrollView {
  private options: Options;
  private elements: Element[];
  private intersectionObserver: any;

  private constructor(options: Options = {}) {
    if (!(<any>window).IntersectionObserver) {  
      throw Error(`
        Your browser does not support IntersectionObserver!
        Get a polyfill from here:
        https://github.com/w3c/IntersectionObserver/tree/master/polyfill
      `);
    }

    this.options = {
      ...ScrollView.DEFAULTS,
      ...options
    };

    this.elements = Array.from(document.querySelectorAll(this.options.selector));
    this.intersectionObserver = null;
    this._onIntersection = this._onIntersection.bind(this);
    this._init();
  }

  static get DEFAULTS() {
    return {
      rootMargin: '0% 50%',
      threshold: 0.5,
      animateClassName: 'sv-animate',
      selector: '[data-sv]',
      once: true
    };
  }

  private _init() {
    this.intersectionObserver = new IntersectionObserver(this._onIntersection, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold,
    });
    this.elements.forEach(element => this.intersectionObserver.observe(element));
  }

  private _onIntersection(entries: any, observer: any) {
    entries.forEach((entry: any) => {
      if (entry.intersectionRatio >= this.options.threshold) {
        entry.target.classList.add(this.options.animateClassName)
        if (this.options.once) {
          observer.unobserve(entry.target);
        }
      } else if (!this.options.once) {
        entry.target.classList.remove(this.options.animateClassName)
      }
    });
  }

  public destroy() {
    this.intersectionObserver.disconnect();
    this.intersectionObserver = null;
  }
}

(<any>window).ScrollView = ScrollView;
export default ScrollView;