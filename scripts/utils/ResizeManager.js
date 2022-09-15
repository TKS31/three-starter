class ResizeManager {
  #handlerList = [];
  #timeoutId;
  constructor() {
    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  add({ handler, index }) {
    if (index) {
      this.#handlerList.splice(index, 0, handler);
    } else {
      this.#handlerList.push(handler);
    }
  }

  remove({ handler }) {
    this.#handlerList = this.#handlerList.filter(fn => fn !== handler);
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