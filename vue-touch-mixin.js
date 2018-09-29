/**
 *手势mixin
 */
let vueTouch = function (el, binding, type) {//触屏函数
  let _this = this;
  this.obj = el;
  this.binding = binding;
  this.touchType = type;
  this.vueTouches = {x: 0, y: 0};//触屏坐标
  this.vueMoves = true;
  this.vueLeave = true;
  this.vueCallBack = function (e, disXY) {
    binding.value(el, e, disXY);
  };
  this.start = function (e) {//监听touchstart事件
    this.vueMoves = true;
    this.vueLeave = true;
    this.longTouch = true;
    this.vueTouches = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY};
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) {
        this.touchType === "vuelongtap" && this.vueCallBack(e);
        this.longTouch = false;
      }
    }.bind(this), 1000);
  };
  this.end = function (e) {//监听touchend事件
    let disX = e.changedTouches[0].pageX - this.vueTouches.x;//计算移动的位移差
    let disY = e.changedTouches[0].pageY - this.vueTouches.y;
    let disXY = {
      disX: disX,
      disY: disY
    };
    clearTimeout(this.time);
    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {//当横向位移大于10，纵向位移大于100，则判定为滑动事件
      this.touchType === "vueswipe" ? this.vueCallBack(e, disXY) : '';//若为滑动事件则返回
      if (Math.abs(disX) > Math.abs(disY)) {//判断是横向滑动还是纵向滑动
        if (disX > 10) {
          this.touchType === "vueswiperight" ? this.vueCallBack(e, disXY) : '';//右滑
        }
        if (disX < -10) {
          this.touchType === "vueswipeleft" ? this.vueCallBack(e, disXY) : '';//左滑
        }
      } else {
        if (disY > 10) {
          this.touchType === "vueswipedown" ? this.vueCallBack(e, disXY) : '';//下滑
        }
        if (disY < -10) {
          this.touchType === "vueswipeup" ? this.vueCallBack(e, disXY) : '';//上滑
        }
      }

    } else {
      if (this.longTouch && this.vueMoves) {
        this.touchType === "vuetap" ? this.vueCallBack(e) : '';
        this.vueLeave = false
      }
    }
  };
  this.move = function (e) {//监听touchmove事件
    this.vueMoves = false;
  };
  let EVENT_START, EVENT_MOVE, EVENT_END;
  if ('ontouchstart' in window) {
    EVENT_START = 'touchstart';
    EVENT_MOVE = 'touchmove';
    EVENT_END = 'touchend';
  } else {
    EVENT_START = 'mousedown';
    EVENT_MOVE = 'mousemove';
    EVENT_END = 'mouseup';
  }
  this.obj.addEventListener(EVENT_START, function (e) {
    _this.start(e);
  }, false);
  this.obj.addEventListener(EVENT_MOVE, function (e) {
    _this.end(e);
  }, false);
  this.obj.addEventListener(EVENT_END, function (e) {
    _this.move(e);
  }, false);
};

const mixin = {
  directives: {
    vuetap: {//点击事件
      inserted: function (el, binding) {
        new vueTouch(el, binding, "vuetap");
      }
    },
    vueswipe: {//滑动事件
      inserted: function (el, binding) {
        new vueTouch(el, binding, "vueswipe");
      }
    },
    vueswipeleft: {//左滑事件
      inserted: function (el, binding) {
        new vueTouch(el, binding, "vueswipeleft");
      }
    },
    vueswiperight: {//右滑事件
      inserted: function (el, binding) {
        new vueTouch(el, binding, "vueswiperight");
      }
    },
    vueswipedown: {//下滑事件
      inserted: function (el, binding) {
        new vueTouch(el, binding, "vueswipedown");
      }
    },
  }
};
export default mixin

