function selectionToArray(selection) {
  const len = selection.length;
  const result = [];
  for (let i = 0; i < len; i += 1) {
    result.push(selection[i]);
  }
  return result;
}

function select(selector) {
  return document.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return selectionToArray(parent.querySelectorAll(selector));
}

function find(el, selector) {
  return selectionToArray(el.querySelectorAll(selector));
}

function removeClass(el, className) {
  el.classList.remove(className);
}

function addClass(el, className) {
  el.classList.add(className);
}

function hasClass(el, className) {
  return el.classList.contains(className);
}

function removeElement(el) {
  el && el.parentNode && el.parentNode.removeChild(el);
}

function closest(el, selector) {
  let matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

function getStyle(el, property, num) {
  let val = window.getComputedStyle(el, null).getPropertyValue(property);
  return num ? Number.parseFloat(val, 10) : val;
}

function blur() {
  document.activeElement && document.activeElement.blur();
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function(prop) {
    const value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

function setStyles(element, styles) {
  Object.keys(styles).forEach(prop => {
    element.style[prop] = styles[prop];
  });
}

function insertHtml(el, position, html) {
  let positions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
  if (!positions.includes(position)) {
    throw new TypeError(
      `'position' must be one of them: ${positions.join('、')}`
    );
  }
  el.insertAdjacentHTML(position, html);
}

module.exports = {
  select,
  selectAll,
  find,
  removeClass,
  addClass,
  hasClass,
  removeElement,
  closest,
  getStyle,
  blur,
  insertHtml,
  setAttributes,
  setStyles
};
