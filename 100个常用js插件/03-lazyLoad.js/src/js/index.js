class LazyLoad {
  constructor(options) {

    this.options = Object.assign({}, {
      offset: 100,
      throttle: 100,
      loadCallback: new Function()
    }, options);

    this.elements = [].slice.call(document.querySelectorAll('[data-lazy]')) || [];

    this._init();
  }

  _init() {
    this._dataRender();
    this._eventBinding();
  }

  _eventBinding() {
    let self = this;
    document.addEventListener('scroll', function() {
      setTimeout(function() {
        self._dataRender()
      }, self.options.throttle);
    }, false);
  }

  _dataRender() {
    let self = this;
    let docHeight = document.documentElement.clientHeight;
    self.elements.filter(item => {
      return !!item.getAttribute('data-lazy');
    }).forEach((element, index) => {
      let imgUrl = element.getAttribute('data-lazy');
      let eleTop = element.getBoundingClientRect().top;
      let eleBottom = element.getBoundingClientRect().bottom;
      if ((eleTop + self.options.offset) < docHeight && eleBottom > self.options.offset) {
        element.src = imgUrl;
        element.removeAttribute('data-lazy');
        self.options.loadCallback(element);
      }
    });
  }

}

window.LazyLoad = LazyLoad;
module.exports = LazyLoad;
