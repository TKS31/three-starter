export function $(selector: string, parent: Document | HTMLElement = document) {
  return parent.querySelector(selector)!;
}

export function $$(selector: string, parent: Document | HTMLElement = document) {
  return [...parent.querySelectorAll(selector)]!;
}