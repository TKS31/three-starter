let instance;

export default class Resize {
  #listenerList = [];
  #timeoutId;
  
  constructor() {
    if (instance) return instance;
    instance = this;
    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  static get instance() {
    return instance || (instance = new Resize());
  }

  static add(fn, context, index) {
    const listener = { fn, context };
    if (index) {
      this.instance.#listenerList.splice(index - 1, 0, listener);
    } else {
      this.instance.#listenerList.push(listener);
    }
  }

  static remove(fn, context) {
    this.instance.#listenerList = this.instance.#listenerList.filter(listener => {
      return !(listener.fn === fn && listener.context === context);
    });
  }

  #onResize() {
    if (this.#listenerList.length) {
      for (let i = 0; i < this.#listenerList.length; i++) {
        const listener = this.#listenerList[i];
        listener.fn.call(listener.context);
      }
    }
  }
}
