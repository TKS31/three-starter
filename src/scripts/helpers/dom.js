export function $(selector, element = document) {
  return element.querySelector(selector);
}

export function $$(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
