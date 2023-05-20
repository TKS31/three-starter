export function query(selector, element = document) {
  return element.querySelector(selector);
}

export function queryAll(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
