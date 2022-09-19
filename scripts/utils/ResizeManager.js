class ResizeManager {
  #listenerList = [];
  #timeoutId;
  constructor() {
    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  add(listener, index) {
    if (index) {
      this.#listenerList.splice(index, 0, listener);
    } else {
      this.#listenerList.push(listener);
    }
  }

  remove(listener) {
    this.#listenerList = this.#listenerList.filter(ownListener => ownListener !== listener);
  }

  #onResize() {
    if (this.#listenerList.length) {
      for (let i = 0; i < this.#listenerList.length; i++) {
        this.#listenerList[i]();
      }
    }
  }
}

export default new ResizeManager();