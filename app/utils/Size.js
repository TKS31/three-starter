let instance = null;

export default class Size {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
    window.addEventListener('resize', this.onResize.bind(this));
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

  onResize() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
  }
}