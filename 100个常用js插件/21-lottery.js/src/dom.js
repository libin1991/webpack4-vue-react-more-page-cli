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

function getStyle(el, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function blur() {
  document.activeElement && document.activeElement.blur();
}

function insertHtml() {
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
  insertHtml
};
