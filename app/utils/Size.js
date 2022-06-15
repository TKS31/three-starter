let instance = null;

export default class Size {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  static get instance() {
    if (!instance) instance = new Size();
    return instance;
  }

  static get width() {
    return this.instance._width;
  }

  static get height() {
    return this.instance._height;
  }

  static get pixelRatio() {
    return this.instance._pixelRatio;
  }

  static onResize() {
    this.instance._width = window.innerWidth;
    this.instance._height = window.innerHeight;
    this.instance._pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}