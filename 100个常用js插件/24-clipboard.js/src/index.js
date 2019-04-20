import Emitter from 'tiny-emitter';

class Clipboard extends Emitter {
  constructor(options) {
    super();

    this.options = {
      ...Clipboard.DEFAULTS,
      ...options
    };

    this.targetEl =
      this.options.target instanceof Element
        ? this.options.target
        : document.querySelector(this.options.target);

    this.triggerEl =
      this.options.trigger instanceof Element
        ? this.options.trigger
        : document.querySelector(this.options.trigger);

    this._event = this._event.bind(this);
    this.triggerEl.addEventListener('click', this._event, false);
  }

  static get DEFAULTS() {
    return {
      target: '',
      trigger: '',
      beforecopy: null,
      success: null,
      error: null
    };
  }

  _event() {
    this.originalSelectedText = this._selectedText() || '';
    this.selectedText =
      typeof this.options.beforecopy === 'function'
        ? this.options.beforecopy({
            text: this.originalSelectedText,
            target: this.targetEl,
            trigger: this.triggerEl
          })
        : this.originalSelectedText;

    this.fakeElem = document.createElement('textarea');
    this.fakeElem.style.contain = 'strict';
    this.fakeElem.style.fontSize = '12pt';
    this.fakeElem.style.border = '0';
    this.fakeElem.style.padding = '0';
    this.fakeElem.style.margin = '0';
    this.fakeElem.style.position = 'absolute';
    this.fakeElem.style.left = '-9999px';
    this.fakeElem.setAttribute('readonly', '');
    this.fakeElem.value = this.selectedText;
    document.body.appendChild(this.fakeElem);
    this.fakeElem.select();
    this.fakeElem.selectionStart = 0;
    this.fakeElem.selectionEnd = this.selectedText.length;
    let succeeded;
    try {
      succeeded = document.execCommand('copy');
    } catch (err) {
      succeeded = false;
    }
    this._handleResult(succeeded);
  }

  _selectedText() {
    let selectedText;
    let element = this.targetEl;
    let nodeName = element.nodeName;
    if (
      nodeName === 'SELECT' ||
      nodeName === 'INPUT' ||
      nodeName === 'TEXTAREA'
    ) {
      element.focus();
      selectedText = element.value;
    } else {
      selectedText = element.textContent;
    }
    return selectedText;
  }

  _handleResult(succeeded) {
    document.body.removeChild(this.fakeElem);
    let result = {
      text: this.selectedText,
      target: this.targetEl,
      trigger: this.triggerEl
    };

    if (succeeded) {
      typeof this.options.success === 'function'
        ? this.options.success(result)
        : this.emit('success', result);
    } else {
      typeof this.options.error === 'function'
        ? this.options.error(result)
        : this.emit('error', result);
    }
  }

  destroy() {
    this.triggerEl.removeEventListener('click', this._event, false);
  }
}

window.Clipboard = Clipboard;
module.exports = Clipboard;
