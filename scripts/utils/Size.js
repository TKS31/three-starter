import { nanoid } from "nanoid";

class Size {
  #width;
  #height;
  #dpr;
  #handlers = [];
  #timeoutId;
  
  constructor() {
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;
    this.#dpr = Math.min(window.devicePixelRatio, 2);

    window.addEventListener('resize', () => {
      if (this.#timeoutId) clearTimeout(this.#timeoutId);
      this.#timeoutId = setTimeout(this.#onResize.bind(this), 200);
    });
  }

  addResizeHandler(handler, priority = 0) {
    const id = nanoid();

    this.#handlers.push({ id, handler, priority });
    this.#handlers.sort((a, b) => b.priority - a.priority);

    return id;
  }

  removeResizeHandler(id) {
    this.#handlers = this.#handlers.filter(handler => {
      return handler.id !== id;
    });
  }

  #onResize() {
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;
    this.#dpr = Math.min(window.devicePixelRatio, 2);

    if (this.#handlers.length) {
      for (let i = 0; i < this.#handlers.length; i++) {
        this.#handlers[i].handler();
      }
    }
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get dpr() {
    return this.#dpr;
  }
}

export default new Size();
