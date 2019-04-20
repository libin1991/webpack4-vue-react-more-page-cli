import objToString from "obj-to-string";
import './index.scss';
import dom from './dom.js';

const consola = {};
const defaultOptions = {
  target: 'body',
  position: 'bottom',
  size: '300px',
  zIndex: 99
};

let methods = ['log', 'warn', 'error', 'info', 'debug'];
let targetEl, wrapEl, countEl, cleanEl;

consola.creat = (options = {}) => {
  options = { ...defaultOptions,
    ...options
  };
  if (document.querySelector('.consola-container')) return;
  targetEl = document.querySelector(options.target);
  dom.insertHtml(
    targetEl,
    'beforeend',
    `<div class="consola-container ${options.position}" style="z-index: ${
      options.zIndex
    }; ${options.position === 'bottom' ? 'height' : 'width'}: ${options.size}">
      <div class="consola-tools">
        <div class="consola-count">Console <span>0</span></div>
        <div class="consola-clean">Clean</div>
      </div>
      <div class="consola-wrap"></div>
    </div>`
  );

  wrapEl = targetEl.querySelector('.consola-wrap');
  countEl = targetEl.querySelector('.consola-count span');
  cleanEl = targetEl.querySelector('.consola-clean');
  cleanEl.addEventListener('click', consola.clean);

  hookNative(window.console, methods, (method, args) => {
    dom.insertHtml(
      wrapEl,
      'beforeend',
      `<div data-method="${method}" class="method method-${method}">
        <div class="method-icon"></div>
        <div class="method-text">${HTMLEncode(args)}</div>
      </div>`
    );
    countEl.innerHTML = wrapEl.children.length;
    wrapEl.scrollTo(0, wrapEl.scrollHeight);
  });
  
  return consola;
};

consola.clean = () => {
  wrapEl.innerHTML = '';
  countEl.innerHTML = '0';
  return consola;
};

function hookNative(nativeTarget, methods, callback) {
  for (let method of methods) {
    const nativeMethod = nativeTarget[method];
    nativeTarget[method] = function () {
      nativeMethod.apply(this, arguments);
      callback(method, [...arguments]);
    };
  }
}

function HTMLEncode(html) {
  let temp = document.createElement('div');
  html = html.map(item => objToString(item));
  temp.textContent = html;
  let output = temp.innerHTML;
  temp = null;
  return output;
}

window.consola = consola;
module.exports = consola;
