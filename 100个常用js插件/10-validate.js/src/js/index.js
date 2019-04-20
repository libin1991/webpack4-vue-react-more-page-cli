import listen from 'good-listener';

class Validate {
  constructor(options) {
    if (typeof options === 'undefined') {
      throw new TypeError('Validate required `options`.');
    } else if (typeof options.container === 'undefined') {
      throw new TypeError('Validate required `container` Attributes.');
    }

    this.options = {
      ...Validate.DEFAULTS,
      ...options
    };

    if (this.options.container instanceof Element) {
      this.options.container = options.target;
    } else {
      this.options.container = document.querySelector(this.options.container);
    }

    this.config = {
      triggerType: ['blur', 'change', 'input'],
      tabNames: ['input', 'select', 'textarea'],
      inputType: ['text', 'checkbox', 'radio', 'file', 'password'],
      ruleType: ['required', 'minlength', 'maxlength', 'min', 'max', 'regex'],
      rules: [],
      errorDom: {},
      validateState: {}
    }

    this._eventBind = this._eventBind.bind(this);
    this._formSubmit = this._formSubmit.bind(this);

    this._init();

  }

  static get DEFAULTS() {
    return {
      focusError: true,
      itemParent: '',
      submitHandler: new Function(),
      rules: {},
      validators: {},
      errorMsg: {
        requiredMsg: () => `This field is required.`,
        minlengthMsg: num => `This field must consist of at least ${num} characters`,
        maxlengthMsg: num => `This field must consist of at most ${num} characters`,
        minMsg: num => `Please enter a value greater than or equal to ${num}`,
        maxMsg: num => `Please enter a value less than or equal to ${num}`,
        regexMsg: regex => `Please enter the value of the matching ${regex}`,
        isNaNMsg: () => `This field is requires a number type`,
        functionMsg: () => `This field is requires a function type`
      }
    };
  }

  _init(){
    this._getElement();
    this._createRules();
    this._validate();
    this._formSubmit();
  }

  _getElement(){
    this.options.container.classList.add('__validate__form');
    this.options.container.setAttribute('novalidate', true);
    this.config.rules = [].slice.call(this.options.container.querySelectorAll('[name]'));
  }

  _createRules(){
    if(Object.keys(this.options.rules).length !== 0) return;

    let rules = {};
    this.config.rules.map(item => {

      let itemCopy = item;
      if(item.type.toLowerCase() === 'radio' || item.type.toLowerCase() === 'checkbox'){
        if(this.options.itemParent){
          itemCopy = this._closest(item, this.options.itemParent);
          itemCopy.name = item.name;
        }
      }

      rules[itemCopy.name] = [];
      if(itemCopy.required){
        rules[itemCopy.name].push({
          required: true,
          message: itemCopy.getAttribute("requiredmsg") || '',
          trigger: itemCopy.getAttribute("trigger") || ''
        })
      }

      if (!!itemCopy.getAttribute("minLength") || !!itemCopy.getAttribute("maxLength")) {
        rules[itemCopy.name].push({
          minlength: +itemCopy.getAttribute("minLength") || '',
          maxlength: +itemCopy.getAttribute("maxLength") || '',
          message: itemCopy.getAttribute("lengthmsg") || '',
          trigger: itemCopy.getAttribute("trigger") || ''
        })
      }

      if (!!itemCopy.getAttribute("min") || !!itemCopy.getAttribute("max")) {
        rules[itemCopy.name].push({
          min: +itemCopy.getAttribute("min") || '',
          max: +itemCopy.getAttribute("max") || '',
          message: itemCopy.getAttribute("nummsg") || '',
          trigger: itemCopy.getAttribute("trigger") || ''
        })
      }

      if (!!item.getAttribute("regex")) {
        rules[item.name].push({
          regex: eval(item.getAttribute("regex")) || '',
          message: item.getAttribute("regexmsg") || '',
          trigger: item.getAttribute("trigger") || ''
        })
      }

      if(!!itemCopy.getAttribute("validator") && !!this.options.validators[itemCopy.getAttribute("validator")]){
        rules[itemCopy.name].push({
          validator: this.options.validators[itemCopy.getAttribute("validator")] || '',
          trigger: itemCopy.getAttribute("trigger") || ''
        })
      }

    });

    this.options.rules = {
      ...this.options.rules,
      ...rules
    }

  }

  _validate(submit, names){
    this.config.rules.map(item => {
      let rules = this.options.rules[item.name];
      this.config.tabNames.indexOf(item.tagName.toLowerCase()) !== -1 && rules && rules.map(rule => {
        if(!rule.trigger || this.config.triggerType.indexOf(rule.trigger) === -1){
          throw new TypeError(`Rule ${item.name} --> required trigger attributes: ${this.config.triggerType.join('、')}`);
        } else {
          this._eventBind(item, rule, submit, names);
        }
      })
    })
  }

  _eventBind(item, rule, submit, names){
    if(names && names.indexOf(item.name) === -1) return;
    let _event = e => {
      if(rule.validator){
        if(typeof rule.validator !== 'function'){
          this._errorMsg(item, rule.message || this.options.errorMsg.functionMsg());
        } else {
          let errorFn = error => {
            if(error){
              this._errorMsg(item, error.message);
            } else {
              this._removeError(item);
            }
          }
          if(item.type.toLowerCase() === 'checkbox'){
            let checkboxValue = this.config.rules.filter(inputDom => {
              return inputDom.name === item.name
            }).filter(checkboxDom => {
              return checkboxDom.checked
            }).map(check => check.value);
            rule.validator(checkboxValue, errorFn);
          } else if (item.type.toLowerCase() === 'radio') {
            let radioValue = this.config.rules.filter(inputDom => {
              return inputDom.name === item.name
            }).filter(radioDom => {
              return radioDom.checked
            })[0];
            if(radioValue){
              rule.validator(radioValue.value, errorFn)
            } else {
              rule.validator('', errorFn)
            }
          } else {
            rule.validator(item.value, errorFn)
          }
        }
        return;
      }

      if(rule.required){
        if(item.value === ''){
          this._errorMsg(item, rule.message || this.options.errorMsg.requiredMsg());
        } else {
          this._removeError(item);
        }
      } else if (rule.minlength || rule.maxlength) {
        if(this.config.errorDom[item.name]) return;
        if (item.value.length < rule.minlength){
          this._errorMsg(item, rule.message || this.options.errorMsg.minlengthMsg(rule.minlength));
        } else if (item.value.length > rule.maxlength) {
          this._errorMsg(item, rule.message || this.options.errorMsg.maxlengthMsg(rule.maxlength));
        } else {
          this._removeError(item);
        }
      } else if (rule.min || rule.max){
        if(this.config.errorDom[item.name]) return;
        if(isNaN(item.value)){
          this._errorMsg(item, this.options.errorMsg.isNaNMsg());
        } else if (item.value < rule.min){
          this._errorMsg(item, rule.message || this.options.errorMsg.minMsg(rule.min));
        } else if (item.value > rule.max) {
          this._errorMsg(item, rule.message || this.options.errorMsg.maxMsg(rule.max));
        } else {
          this._removeError(item);
        }
      } else if (rule.regex) {
        if(this.config.errorDom[item.name]) return;
        if(!new RegExp(rule.regex).test(item.value)){
          this._errorMsg(item, rule.message || this.options.errorMsg.regexMsg(rule.regex));
        } else {
          this._removeError(item);
        }
      }
    }

    submit && _event() || listen(item, rule.trigger, _event);
  }

  _errorMsg(item, message){
    this._removeError(item);
    if(item.type.toLowerCase() !== 'checkbox'){
      item.classList.add('error');
      item.classList.remove('valid');
    }
    if(this.options.itemParent && this._closest(item, this.options.itemParent)){
      this._closest(item, this.options.itemParent).classList.add('parent-error');
      this._closest(item, this.options.itemParent).classList.remove('parent-valid');
      this._closest(item, this.options.itemParent).insertAdjacentHTML('beforeend', `<label id="${item.name}-error" class="error" for="${item.name}">${message}</label>`);
    } else {
      item.insertAdjacentHTML('afterEnd', `<label id="${item.name}-error" class="error" for="${item.name}">${message}</label>`);
    }
    this.config.errorDom[item.name] = this.options.container.querySelector(`#${item.name}-error`);
  }

  _removeError(item){
    if(item.type.toLowerCase() !== 'checkbox'){
      item.classList.remove('error');
      item.classList.add('valid');
    }
    if(this.options.itemParent && this._closest(item, this.options.itemParent)){
      this._closest(item, this.options.itemParent).classList.remove('parent-error');
      this._closest(item, this.options.itemParent).classList.add('parent-valid');
    }
    if(this.config.errorDom[item.name]){
      this._removeDom(this.config.errorDom[item.name]);
      this.config.errorDom[item.name] = false;
    }
  }

  _formSubmit(){
    let _validate = e => {
      e && e.preventDefault();
      this._validate(true);
      this._validateState();
      this.options.focusError && this._focus();
      let flag = Object.keys(this.config.validateState).every(item => {
        return this.config.validateState[item]
      });
      flag && this.options.submitHandler(this.options.container);
    }
    listen(this.options.container, 'submit', _validate);
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  validate(names){
    this._validate(true, names);
    this._validateState(names);
    this.options.focusError && this._focus();
    return this.config.validateState;
  }

  /**
  * ================================== HELPER ==================================
  */

  _validateState(names){
    this.config.validateState = {};
    names = !names ? Object.keys(this.options.rules) : names;
    names.map(item => {
      this.config.validateState[item] = !this.config.errorDom[item]
    });
  }

  _focus(){
    let errorList = Object.keys(this.config.validateState).filter(item => {
      return !this.config.validateState[item]
    });
    if(errorList.length > 0){
      this.options.container.querySelector(`[name = ${errorList[0]}]`).focus();
    }
  }

  _closest(el, selector) {
    let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  }

  _removeDom(el){
    el.parentNode.removeChild(el);
  }

}

window.Validate = Validate;
module.exports = Validate;
