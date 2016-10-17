import { isNil } from 'lodash';

export function read(key) {
  if (!isNil(document)) {
    const value = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
    return !isNil(value) ? value.pop() : null;
  }
  return null;
}

export function set(name, value, domain = '', days = false, path = '/') {
  if (!isNil(document)) {
    let expiresIn = days;
    if (days) {
      expiresIn = new Date();
      expiresIn.setTime(new Date().getTime() + (days * 24 * 60 * 60 * 1000));
      expiresIn = expiresIn.toGMTString();
    }
    document.cookie = `${name}=${value};Domain=${domain};expires=${expiresIn};path=${path};`;
  }
  return null;
}
