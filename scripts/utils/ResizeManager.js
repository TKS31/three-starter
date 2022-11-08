class ResizeManager {
  #listenerList = [];
  #timeoutId;
  
  constructor() {
    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  add(fn, context, index) {
    const listener = { fn, context };
    if (index) {
      this.#listenerList.splice(index - 1, 0, listener);
    } else {
      this.#listenerList.push(listener);
    }
  }

  remove(fn, context) {
    this.#listenerList = this.#listenerList.filter(listener => {
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

export default new ResizeManager();