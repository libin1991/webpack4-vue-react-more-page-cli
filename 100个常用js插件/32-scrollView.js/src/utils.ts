export function selectionToArray(selection: NodeList): Array<Node> {
  const len: number = selection.length;
  const result = [];
  for (let i = 0; i < len; i += 1) {
    result.push(selection[i]);
  }
  return result;
}

export function select(selector: string): Element {
  return document.querySelector(selector);
}

export function selectAll(
  selector: string,
  parent: Element | Document = document
): Array<Node> {
  return selectionToArray(parent.querySelectorAll(selector));
}

export function find(el: Element, selector: string): Array<Node> {
  return selectionToArray(el.querySelectorAll(selector));
}

export function removeClass(el: Element, className: string): void {
  el.classList.remove(className);
}

export function addClass(el: Element, className: string): Element {
  return el.classList.add(className), el;
}

export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className);
}

export function removeElement(el: Element): void {
  el && el.parentNode && el.parentNode.removeChild(el);
}

export function closest(el: Element, selector: string): Element {
  let matchesSelector =
    el.matches || el.webkitMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

export function getStyle(
  el: any,
  property: string,
  isNum?: boolean
): string | number {
  let val = document.defaultView
    .getComputedStyle(el, null)
    .getPropertyValue(property);
  return isNum ? parseFloat(val) : val;
}

export function setAttributes(el: Element, attributes: any): void {
  Object.keys(attributes).forEach(function(prop) {
    const value: string | boolean = attributes[prop];
    if (value !== false) {
      el.setAttribute(prop, attributes[prop]);
    } else {
      el.removeAttribute(prop);
    }
  });
}

export function setStyles(el: any, styles: any): void {
  Object.keys(styles).forEach((prop: any) => {
    el.style[prop] = styles[prop];
  });
}

export function insertHtml(
  el: any,
  position: InsertPosition,
  html: string
): void {
  let positions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];
  positions.includes(position) && el.insertAdjacentHTML(position, html);
}

export function clamp(num: number, a: number, b: number): number {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

const captureMode = false;

export function on(
  el: HTMLElement,
  event: string,
  fn: EventListenerObject,
  options = {}
): Object {
  el.addEventListener(event, fn, {
    capture: captureMode,
    ...options
  });
  return {
    destroy() {
      off(el, event, fn, options);
    }
  };
}

export function off(
  el: HTMLElement,
  event: string,
  fn: EventListenerObject,
  options = {}
): void {
  el.removeEventListener(event, fn, {
    capture: captureMode,
    ...options
  });
}

export function autoBind(): void {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
  for (let fn of methods) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  }
}

export function debounce(ctx: any, func: Function, wait: number): Function {
  let timeout: any;
  return () => {
    const later = function() {
      timeout = null;
      func.apply(ctx, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (!timeout) {
      func.apply(ctx, arguments);
    }
  };
}

export function recordAnimationFrames(
  callback: Function,
  autoStart = true
): Object {
  let running = true,
    raf: number;
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
}