import { nanoid } from "nanoid";

class Resize {
  #callbacks = [];
  #timeoutId;
  
  constructor() {
    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  add(callback, priority = 0) {
    const id = nanoid();

    this.#callbacks.push({ id, callback, priority });
    this.#callbacks.sort((a, b) => b.priority - a.priority);

    return id;
  }

  remove(id) {
    this.#callbacks = this.#callbacks.filter(callback => {
      return callback.id !== id;
    });
  }

  #onResize() {
    if (this.#callbacks.length) {
      for (let i = 0; i < this.#callbacks.length; i++) {
        this.#callbacks[i].callback();
      }
    }
  }
}

export default new Resize();
