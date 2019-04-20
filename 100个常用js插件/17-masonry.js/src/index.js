import './index.scss';

class Masonry {
  constructor(el = '.masonry-container', options) {
    this.options = {
      ...Masonry.DEFAULTS,
      ...options
    };

    this.config = {
      containerEl: el instanceof Element ? el : document.querySelector(el),
      columns: 0,
      containerWidth: 0,
      containerheight: 0,
      listEl: [],
      itemWidth: 0,
      verticalList: []
    };

    this._itemPos = this._itemPos.bind(this);
    this._init = this._init.bind(this);
    
    this._init()
    window.addEventListener('resize', e => {
      this.config.verticalList = [];
      this._throttle(this._init, 100);
    });
  }

  static get DEFAULTS() {
    return {
      margin: 24,
      columns: 6,
      breakAt: {
        1200: 5,
        940: 3,
        520: 2,
        400: 1
      }
    };
  }

  _init() {
    this._initContainer();
    this._itemSize();
  }

  /**
   * ================================== PRIVATE METHODS ==================================
   */

  _initContainer(){
    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    this.config.containerEl.style.position = 'relative';
    this.config.containerWidth = this.config.containerEl.clientWidth;
    if(bodyWidth > this.config.containerWidth){
      this.config.columns = this.options.columns;
    } else {
      this.config.containerWidth = bodyWidth;
      let sizeList = Object.keys(this.options.breakAt).map(item => parseInt(item)).sort((a, b) => b - a);
      if(sizeList.length > 0){
        sizeList.forEach((item, index) => {
          let nextSize = sizeList[index + 1] || 0;
          if(bodyWidth <= sizeList[index] && bodyWidth > nextSize){
            this.config.columns = this.options.breakAt[item];
          }
        });
      } else {
        this.config.columns = this.options.columns;
      }
    }
    this.config.listEl = [].slice.call(this.config.containerEl.children).map((target, index) => {
      return {
        index: index,
        target: target,
        imgLoad: false,
        top: 0,
        left: 0,
        height: 0
      }
    });
  }

  // 计算元素width和heidth
  _itemSize(){
    this.config.itemWidth = (this.config.containerWidth - this.options.margin * (this.config.columns - 1)) / this.config.columns;
    this.config.listEl.forEach((item, index) => {
      let imgItem = item.target.querySelector('img');
      item.target.style.position = 'absolute';
      item.target.style.width = this.config.itemWidth + 'px';
      this._imgLoad(imgItem).then(() => {
        item.imgLoad = true;
        item.height = this._outerSize(item.target).height;
        this._throttle(this._itemPos, 100);
      })
    })
  }

  // 计算元素top和left
  _itemPos(){
    this.config.listEl.forEach((item, index) => {
      let { minHeight, minIndex } = this._containerHeight(item, index);
      let rest = index % this.config.columns;
      item.left = (this.config.itemWidth + this.options.margin) * ((index + 1) > this.config.columns ? minIndex : rest);
      item.target.style.left = item.left + 'px';
      if((index + 1) > this.config.columns){
        item.top = minHeight;
        item.target.style.top = minHeight + 'px';
      } else {
        item.top = 0;
        item.target.style.top = '0px';
      }
    })
    
  }

  // 计算容器高度
  _containerHeight(lastItem, lastIndex){
    if((lastIndex + 1) <= this.config.columns){
      this.config.verticalList[lastIndex] = [lastItem]
    }
    let list = [];
    this.config.verticalList.forEach((column, index) => {
      column.forEach(item => {
        if(!list[index]) list[index] = 0;
        list[index] += item.height;
      })
    })
    this.config.containerheight = Math.max.apply(Math, list);
    this.config.containerEl.style.height = this.config.containerheight + 'px';
    let minHeight = Math.min.apply(Math, list);
    let minIndex = list.indexOf(minHeight);
    if((lastIndex + 1) > this.config.columns){
      this.config.verticalList[minIndex].push(lastItem);
    }
    return {
      minHeight: minHeight,
      minIndex: minIndex
    };
  }

  // 图片是否加载完成
  _imgLoad(image){
    const imageHasLoaded = (img) => !('naturalHeight' in img && img.naturalHeight + img.naturalWidth === 0) || img.width + img.height !== 0;    
    return new Promise((resolve, reject) => {
      if (image.complete) {
        if (!imageHasLoaded(image)) {
          return reject(image);
        }
        return resolve(image);
      }

      image.addEventListener('load', () => {
        if (imageHasLoaded(image)) {
          return resolve(image);
        }
        return reject(image);
      });

      image.addEventListener('error', () => {
        return reject(image);
      });
    });
  }


  /**
   * ================================== PUBLIC METHODS ==================================
   */

  update(){
    this._init();
  }

  /**
   * ================================== HELPER ==================================
   */

  // 获取dom样式
  _getStyle(element, property){
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }

  _outerSize(element){
    let heightList = ['margin-top', 'margin-bottom', 'border-top-width', 'border-bottom-width'];
    let widthList = ['margin-left', 'margin-right', 'border-left-width', 'border-right-width'];
    let outerHeight = heightList.reduce((total, item) => {
      return total + parseInt(this._getStyle(element, item))
    }, element.offsetHeight);
    let outerWidth = widthList.reduce((total, item) => {
      return total + parseInt(this._getStyle(element, item))
    }, element.offsetWidth);
    return {
      height: outerHeight,
      width: outerWidth
    }
  }

  _throttle(method, time) {
    clearTimeout(method.tId);
    method.tId = setTimeout(() => {
      method();
    }, time);
  }

}

window.Masonry = Masonry;
module.exports = Masonry;