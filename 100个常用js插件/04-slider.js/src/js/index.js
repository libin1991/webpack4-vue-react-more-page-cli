class Slider {
  constructor(options) {
    if (typeof options === 'undefined') {
      throw new TypeError('Slider required `options`.');
    } else if (typeof options.container === 'undefined') {
      throw new TypeError('Slider required `container` option.');
    }

    if (options.container instanceof Element) {
      this.element = options.container;
    } else {
      this.element = document.querySelectorAll(options.container)[0];
    }

    this.sliderItem = [].slice.call(this.element.querySelectorAll('.slider_item')) || [];

    this.options = Object.assign({}, {
      mode: 'fade',
      duration: 50,
      delay: 2000,
      start: 0,
      auto: true,
      loop: true,
      direction: false,
      controls: false,
      captions: false
    }, options);

    this._eventDirection = this._eventDirection.bind(this);
    this._eventControls = this._eventControls.bind(this);
    this._eventMousemove = this._eventMousemove.bind(this);
    this._eventMouseout = this._eventMouseout.bind(this);

    this.timer;

    this._init();
  }

  _init() {
    this._createElement();
    this.options.auto && this._auto();
  }

  /**
  * ================================== Play Options ==================================
  */

  _auto(init = true){
    let self = this;
    this.timer = setInterval(function () {
      document.hidden == false && self._eventDirRight();
    }, this.options.delay)
  }

  /**
  * ================================== Create Element ==================================
  */

  _createElement() {
    this._createSliders();
    this.options.direction && this._createDirection();
    this.options.controls && this._createControls();
    this.options.direction && this._createCaptions();
    this.options.auto && this.element.addEventListener('mousemove', this._eventMousemove, false);
    this.options.auto && this.element.addEventListener('mouseout', this._eventMouseout, false);
    this.element.className = this.element.className + ' ' +this.options.mode;
  }

  _createSliders() {
    this.sliderItem.forEach((item, index) => {
      item.setAttribute('data-index', index);
      item.style.display = 'none';
    });
    this.sliderItem[this.options.start].style.display = 'block';
  }

  _createDirection() {
    let direction = document.createElement('div');
    direction.setAttribute('class', 'slider_direction');
    let prev = document.createElement('a');
    prev.setAttribute('class', 'prev');
    let next = document.createElement('a');
    next.setAttribute('class', 'next');
    direction.appendChild(prev);
    direction.appendChild(next);
    prev.addEventListener('click', this._eventDirection, false);
    next.addEventListener('click', this._eventDirection, false);
    this.element.appendChild(direction);
  }

  _createControls() {
    let self = this;
    let controls = document.createElement('div');
    controls.setAttribute('class', 'slider_control');
    let sliderLength = 0;
    while (sliderLength < self.sliderItem.length) {
      let control = document.createElement('a');
      self.options.start === sliderLength && control.setAttribute('class', 'active');
      controls.appendChild(control);
      control.index = sliderLength;
      control.addEventListener('click', this._eventControls, false);
      sliderLength++;
    }
    this.element.appendChild(controls);
  }

  _createCaptions() {
    let self = this;
    let captions = document.createElement('div');
    captions.setAttribute('class', 'slider_caption');
    captions.innerHTML = self.sliderItem[self.options.start].getAttribute('title');
    this.element.appendChild(captions);
  }

  /**
  * ================================== Event Binding ==================================
  */

  _eventMousemove(){
    this.options.auto = false;
    clearInterval(this.timer);
  }

  _eventMouseout(){
    this.options.auto = true;
    this._auto();
  }

  _eventDirection(event) {
    if (event.target.className === 'prev') {
      this._eventDirLeft()
    } else {
      this._eventDirRight()
    }
  }

  _eventDirLeft(){
    if (this.options.loop == false && this.options.start == 0) return;
    let sliderLength = this.sliderItem.length - 1;
    this.options.start = this.options.start === 0 ? sliderLength : --this.options.start;
    this._render(this.options.start);
  }

  _eventDirRight(){
    if (this.options.loop == false && this.options.start == (this.sliderItem.length - 1)) return;
    let sliderLength = this.sliderItem.length - 1;
    this.options.start = this.options.start === sliderLength ? 0 : ++this.options.start;
    this._render(this.options.start);
  }

  _eventControls(event) {
    this.options.start = event.target.index;
    this._render(this.options.start);
  }

  /**
  * ================================== Render Slider ==================================
  */

  _render(index) {
    this._renderCaptions(index);
    this._renderControls(index);
    if (this.options.mode === 'fade') {
      this._renderSliderFade(index);
    } else if(this.options.mode === 'slide'){
      this._renderSliderSlide(index);
    }

  }

  _renderCaptions(index) {
    let captions = this.sliderItem[index].getAttribute('title');
    this.element.querySelectorAll('.slider_caption')[0].innerHTML = captions;
  }

  _renderControls(index) {
    let controls = [].slice.call(this.element.querySelectorAll('.slider_control a'));
    controls.forEach(item => {
      item.className = '';
    });
    controls[index].className = 'active';
  }

  _renderSliderFade(index) {
    let self = this;
    let sliderLength = this.sliderItem.length - 1;
    this.sliderItem.filter((item, itemIndex) => {
      return itemIndex != index
    }).forEach(item => {
      item.style.display = 'none';
    });
    self._fadeIn(this.sliderItem[index])
  }

  _renderSliderSlide(index){
    let self = this;
    let sliderLength = this.sliderItem.length - 1;
    this.sliderItem.filter((item, itemIndex) => {
      return itemIndex != index
    }).forEach(item => {
      item.style.display = 'none';
    });
    this.sliderItem[index].style.display = 'block';
  }

  _fadeIn(el){
    let self = this;
    el.style.opacity = 0;
    el.style.display = "block";
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        setTimeout(fade, self.options.duration);
      }
    })();
  }

}

window.Slider = Slider;
module.exports = Slider;
