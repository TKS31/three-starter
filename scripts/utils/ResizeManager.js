class ResizeManager {
  #handlerList = [];
  #timeoutId;
  constructor() {
    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  add({ callback, index }) {
    if (index) {
      this.#handlerList.splice(index, 0, callback);
    } else {
      this.#handlerList.push(callback);
    }
  }

  remove({ callback }) {
    this.#handlerList = this.#handlerList.filter(handler => handler !== callback);
  }

  #onResize() {
    if (this.#handlerList.length) {
      for (let i = 0; i < this.#handlerList.length; i++) {
        this.#handlerList[i]();
      }
    }
  }
}

export default new ResizeManager();