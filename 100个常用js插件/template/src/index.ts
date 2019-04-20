interface Options {

}

import './index.scss';
import {} from './utils';

class {{className}} {
  private options: Options;

  private constructor(options: Options = {}) {
    this.options = {
      ...{{className}}.DEFAULTS,
      ...options
    };

    this._init();
  }

  static get DEFAULTS() {
    return {

    };
  }

  private _init() {
    console.log(this)
  }

  public destroy() {

  }
}

(<any>window).{{className}} = {{className}};
export default {{className}};