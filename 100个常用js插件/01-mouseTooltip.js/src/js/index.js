class MouseTooltip {
  constructor(selector, settings = {}) {
    //合并配置
    this.settings = this._applyGlobalSettings(settings);

    //接受DOM元素和id、class作为选择器
    if (selector instanceof Element) {
      this.elements = [selector];
    } else {
      this.elements = [].slice.call(document.querySelectorAll(selector));
    }

    //内部配置
    this.config = {
      titles:[],
      id: "mouse-tooltip",
      className: "mouse-tooltip",
      hiddenName: "mouse-tooltip-hidden",
      offset: {
        x: 10,
        y: 10
      }
    };

    //初始化
    this._init();
  }

  /**
  * 全局配置
  */
  _applyGlobalSettings(settings) {
    //默认配置
    const defaults = {
      moveIn: new Function(),
      moveOut: new Function()
    };

    //合并配置
    return {
      moveIn: settings.moveIn || defaults.moveIn,
      moveOut: settings.moveOut || defaults.moveOut
    };
  }

  /**
  * 初始化
  */
  _init() {
    this._createElement();
    this._handleMouse();
  }

  /**
  * 创建tooltip
  */
  _createElement() {
    let divEl = document.createElement("div");
    divEl.setAttribute("id", this.config.id);
    this._addClass(divEl, this.config.className);
    this._addClass(divEl, this.config.hiddenName);
    document.body.appendChild(divEl);
  }

  /**
  * 绑定事件
  */
  _handleMouse() {
    this.elements.forEach( (el, index) => {
      const title = el.getAttribute("data-tooltip"); //获取tooltip文本
      this.config.titles.push(title)
      let moveInState = false; //鼠标是否移入状态
      let divEl = document.getElementById(this.config.id); //获取Tooltips元素

      //鼠标移入
      el.addEventListener("mousemove", event => {
        !moveInState && this.settings.moveIn(el, title, event);
        moveInState = true;
        this._createTooltips(el, index, event);
        this._removeClass(divEl, this.config.hiddenName);
      });

      //鼠标移出
      el.addEventListener("mouseout", event => {
        this.settings.moveOut(el, title, event);
        moveInState = false;
        this._addClass(divEl, this.config.hiddenName);
      });
    });
  }

  /**
  * 事件执行
  */
  _createTooltips(el, index, event) {
    //获取Tooltips元素并设置文本
    let divEl = document.getElementById(this.config.id);
    divEl.innerHTML = this.config.titles[index];

    let winWidth = document.body.clientWidth, //屏幕宽度
      xOffset = this.config.offset.x, //偏移值x
      yOffset = this.config.offset.y, //偏移值y
      ttWidth = divEl.clientWidth, //元素宽度
      ttHeight = divEl.clientHeight, //元素高度
      mouseX = event.pageX, //鼠标x坐标
      mouseY = event.pageY, //鼠标y坐标
      ttLeft = mouseX, //最终计算x值
      ttTop = mouseY; //最终计算y值

    //当超出屏幕宽度靠左显示
    if (mouseX + ttWidth + xOffset > winWidth) {
      ttLeft = mouseX - ttWidth;
      xOffset = xOffset * -1;
    }

    ttLeft = ttLeft + xOffset + "px";
    ttTop = ttTop + yOffset + "px";
    divEl.style.left = ttLeft;
    divEl.style.top = ttTop;
  }

  /**
  * 添加类名
  */
  _addClass(elements, cName) {
    elements.className = (elements.className + " " + cName).trim();
  }

  /**
  * 移除类名
  */
  _removeClass(elements, cName) {
    elements.className = elements.className
      .replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ")
      .trim();
  }

}

window.MouseTooltip = MouseTooltip;
module.exports = MouseTooltip;
