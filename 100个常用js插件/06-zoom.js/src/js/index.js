class Zoom {
  constructor(options) {
    this.elements = [].slice.call(document.querySelectorAll('[data-zoom]')) || [];
    this.callback = !!options && options.callback || new Function();
    this._imgClick = this._imgClick.bind(this);
    this._modalClose = this._modalClose.bind(this);
    this._showEnd = this._showEnd.bind(this);
    this._init();
  }

  _init() {
    this.elements.forEach(item => {
      item.className += ' zoom_item';
      item.addEventListener('click', this._imgClick, false);
    })
  }

  _imgClick(e){
    this.imgTarget = e.target;
    let zoom_modal = document.getElementById('zoom_modal');
    this._createElement(zoom_modal === null);
  }

  _createElement(type){
    if (type === false) {
      this.zoomImg.src = this.imgTarget.getAttribute('data-zoom');
      this.zoomAnimate.src = this.imgTarget.src;
      this._showStart();
      return;
    }
    this.zoomModal = document.createElement('div');
    this.zoomModal.setAttribute('id', 'zoom_modal');
    this.zoomModal.addEventListener('click', this._modalClose, false);
    this.zoomImg = document.createElement('img');
    this.zoomImg.src = this.imgTarget.getAttribute('data-zoom');
    this.zoomImg.setAttribute('id', 'zoom_img');
    this.zoomModal.appendChild(this.zoomImg);
    this.zoomAnimate = document.createElement('img');
    this.zoomAnimate.src = this.imgTarget.src;
    this.zoomAnimate.setAttribute('id', 'zoom_animate');
    this.zoomModal.appendChild(this.zoomAnimate);
    document.body.appendChild(this.zoomModal);
    this._showStart();
  }

  _showStart(){
    this.zoomModal.setAttribute('class', 'loading');
    let imgTargetWidth = this._getStyle(this.imgTarget, 'width').replace(/px/, '') - 0;
    let imgTargetHeight = this._getStyle(this.imgTarget, 'height').replace(/px/, '') - 0;
    let imgTargetTop = this.imgTarget.getBoundingClientRect().top;
    let imgTargetLeft = this.imgTarget.getBoundingClientRect().left;
    this.zoomAnimate.style.width = imgTargetWidth + 'px';
    this.zoomAnimate.style.height = imgTargetHeight + 'px';
    this.zoomAnimate.style.top = imgTargetTop + 'px';
    this.zoomAnimate.style.left = imgTargetLeft + 'px';
    this.imgTarget.style.visibility = 'hidden';
    this.zoomModal.style.display = 'flex';
    this.zoomImg.addEventListener('load', this._showEnd, false);
  }

  _showEnd(){
    this.zoomModal.setAttribute('class', '');
    let imgLoadWidth = this._getStyle(this.zoomImg, 'width').replace(/px/, '') - 0;
    let imgLoadHeight = this._getStyle(this.zoomImg, 'height').replace(/px/, '') - 0;
    let imgLoadTop = this.zoomImg.getBoundingClientRect().top;
    let imgLoadLeft = this.zoomImg.getBoundingClientRect().left;
    let self = this;
    setTimeout(function () {
      self.zoomAnimate.style.width = imgLoadWidth + 'px';
      self.zoomAnimate.style.height = imgLoadHeight + 'px';
      self.zoomAnimate.style.top = imgLoadTop + 'px';
      self.zoomAnimate.style.left = imgLoadLeft + 'px';
    }, 0)
    setTimeout(function () {
      self.zoomImg.style.visibility = 'visible';
      self.zoomAnimate.style.visibility = 'hidden';
    }, 500)
    this.callback(this.zoomImg)
  }

  _modalClose(){
    this.zoomModal.style.display = 'none';
    this.imgTarget.style.visibility = 'visible';
    this.zoomImg.style.visibility = 'hidden';
    this.zoomAnimate.style.visibility = 'visible';
  }

  _getStyle(el, attr) {
    if (el && el.currentStyle) {
      return el.currentStyle[attr]
    } else {
      return window.getComputedStyle(el)[attr]
    }
  }

  destroy(){
    this.elements.forEach(item => {
      item.removeEventListener('click', this._imgClick, false);
    })
    if (!!document.getElementById('zoom_modal')) {
      this.zoomModal.removeEventListener('click', this._modalClose, false);
      this.zoomImg.removeEventListener('load', this._showEnd, false);
    }
  }

}

window.Zoom = Zoom;
module.exports = Zoom;
