import mitt from 'mitt';
import { keycode, keyrev, modprops } from './keycode';

let emitter = mitt();

let hotkey = (key, callback) => {
  if (typeof key !== 'string' && typeof key !== 'number') {
    throw new TypeError('The first parameter required string or number type, but get ' + typeof key);
  } else if (typeof callback !== 'function') {
    throw new TypeError('The second parameter required function type, but get ' + typeof callback);
  }

  key = String(key).toLowerCase().replace(/\s/g, '');
  emitter.on(key, callback);
};

let dispatch = event => {
  let key = String(event.keyCode);
  let name = keyrev[key];
  if (!name) throw new TypeError(`Unknown key: ${key}`);
  for (let mod in modprops) {
    if(name === modprops[mod]) continue;
    key = event[mod] ? keycode[modprops[mod]] + '+' + key : key;
    name = event[mod] ? modprops[mod] + '+' + name : name;
  };

  emitter.emit(name, { event, key, name });
  emitter.emit(key, { event, key, name });
};

window.addEventListener('keydown', dispatch);
hotkey.destroy = () => window.removeEventListener('keydown', dispatch);
window.hotkey = module.exports = hotkey;
