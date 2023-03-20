export function id(name) {
  return document.getElementById(name);
}

export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return [...document.querySelectorAll(selector)];
}
