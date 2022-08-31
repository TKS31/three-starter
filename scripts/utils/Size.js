let instance = null;

export default class Size {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
    this._resizeHandlerList = [];
    this._timeoutId = null;
    window.addEventListener('resize', () => {
      if (this._timeoutId) clearTimeout(this._timeoutId);
      this._timeoutId = setTimeout(this.onResize.bind(this), 200);
    });
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
    return this.instance.pixelRatio;
  }

  static addResizeHandler({ callback, index }) {
    if (index) {
      this.instance._resizeHandlerList.splice(index, 0, callback);
    } else {
      this.instance._resizeHandlerList.push(callback);
    }
  }

  static removeResizeHandler({ callback }) {
    this.instance._resizeHandlerList = this.instance._resizeHandlerList.filter(handler => handler !== callback);
  }

  onResize() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
    if (this._resizeHandlerList.length) {
      for (let i = 0; i < this._resizeHandlerList.length; i++) {
        this._resizeHandlerList[i]();
      }
    }
  }
}