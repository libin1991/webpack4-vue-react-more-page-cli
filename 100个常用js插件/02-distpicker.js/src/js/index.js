import districts from "./districts";

class Distpicker {
  constructor(options) {
    if (typeof options === "undefined") {
      throw new TypeError("Distpicker required `options`.");
    } else if (typeof options.target === "undefined") {
      throw new TypeError("Distpicker required `target` option.");
    }
    if (options.target instanceof Element) {
      this.element = options.target;
    } else {
      this.element = document.querySelectorAll(options.target)[0];
    }
    this.selects = [].slice.call(this.element.getElementsByTagName("select"));
    this.selectsLength = this.selects.length;
    if (this.selectsLength === 0) {
      throw new TypeError("target element required `select` DOM.");
    }
    this.options = Object.assign({}, Distpicker.DEFAULTS, options);
    this.currentCity = [];
    this._change = this._change.bind(this);
    this._init();
  }

  static get DEFAULTS() {
    return {
      placeholder: ["---- 选择省 ----", "---- 选择市 ----", "---- 选择区 ----"],
      autoselect: null,
      valueType: "name",
      callback: new Function()
    };
  }

  _init() {
    if (!!this.options.autoselect) {
      this._autoSelect();
    } else {
      this._createElement();
    }
    this._eventBinding();
  }

  /**
  * ================================== Create Element ==================================
  */

  _createElement(provinceCode, cityCode) {
    this.selectsLength >= 1 && this._createDom(100000, 0);
    this.selectsLength >= 2 && this._createDom(provinceCode, 1);
    this.selectsLength >= 3 && this._createDom(cityCode, 2);
  }

  _createDom(code, index) {
    this.selects[index].innerHTML = "";
    let obj = districts[code] || {};
    let Keys = Object.keys(obj) || [];
    this.selects[index].options.add(new Option(
      this.options.placeholder[index],
      0
    ));
    Keys.forEach(item => {
      this.selects[index].options.add(new Option(obj[item], item));
    });
    while (this.selectsLength - index > 1) {
      this._createDom(0, index + 1);
      index++;
    }
  }

  _autoSelect(value = []) {
    let self = this;
    let codes = [];
    if (value.length > 0) {
      codes = value;
      this.currentCity = this.options.valueType == "name"
        ? codes.forEach(item => {
          this.currentCity.push(self.getDistricts(item));
        }) : codes;
    } else {
      this.options.autoselect.forEach(item => {
        codes.push(self.getDistricts(item));
      });
      this.currentCity = this.options.valueType == "name"
        ? this.options.autoselect
        : codes;
    }
    this._createElement(...codes);
    this.selects.forEach((item, index) => {
      [].slice.call(item.childNodes).every(option => {
        if (option.value == codes[index]) {
          option.selected = true;
          return false;
        }
        return true;
      });
    });
  }

  /**
  * ================================== Event Binding ==================================
  */

  _eventBinding() {
    let self = this;
    this.selects.forEach((item, index) => {
      item.index = index;
      item.addEventListener("change", self._change, false);
    });
  }

  _change(event) {
    this.selectsLength - 1 > event.target.index &&
      this._createDom(event.target.value, event.target.index + 1);
    this.currentCity[event.target.index] = this.options.valueType == "name"
      ? event.target.options[event.target.selectedIndex].text
      : event.target.value;
    this.currentCity.length = event.target.index + 1;
    this.options.callback(this.currentCity);
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  getDistricts(value) {
    let allKeys = Object.keys(districts);
    let name = "";
    allKeys.every(item => {
      let cityList = districts[item];
      let cityKeys = Object.keys(cityList);
      cityKeys.every(item => {
        if (isNaN(value)) {
          if (cityList[item] == value) {
            name = item;
            return false;
          }
        } else {
          if (item == value) {
            name = cityList[item];
            return false;
          }
        }
        return true;
      });
      return true;
    });
    return name;
  }

  getValue() {
    return this.currentCity;
  }

  autoselect(value) {
    this._autoSelect(value);
  }

  reset() {
    this._createElement();
  }

  destroy() {
    let self = this;
    this.selects.forEach((item, index) => {
      item.innerHTML = "";
      item.removeEventListener("change", self._change, false);
    });
  }
}

window.Distpicker = Distpicker;
module.exports = Distpicker;
