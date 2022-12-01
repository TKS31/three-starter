import { nanoid } from 'nanoid';

class Ticker {
  #targetFPS = 60;
  #minFPS = 30;
  #deltaTime = 0;
  #elapsedTime = 0;
  #previousTime = null;
  #deltaRatio = 1;
  #maxDeltaRatio = this.#targetFPS / this.#minFPS;
  #callbacks = [];

  constructor() {
    window.requestAnimationFrame(this.#update.bind(this));
  }

  get elapsedTime() {
    return this.#elapsedTime;
  }

  get deltaTime() {
    return this.#deltaTime;
  }

  get deltaRatio() {
    return this.#deltaRatio;
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

  #update(timestamp) {
    if (!this.#previousTime) this.#previousTime = timestamp;
    this.#elapsedTime = timestamp / 1000;
    this.#deltaTime = (timestamp - this.#previousTime) / 1000;
    this.#previousTime = timestamp;
    this.#deltaRatio = Math.min(this.#deltaTime * this.#targetFPS, this.#maxDeltaRatio);

    if (this.#callbacks.length) {
      for (let i = 0; i < this.#callbacks.length; i++) {
        this.#callbacks[i].callback({
          elapsedTime: this.#elapsedTime,
          deltaTime: this.#deltaTime,
          deltaRatio: this.#deltaRatio
        });
      }
    }

    window.requestAnimationFrame(this.#update.bind(this));
  }
}

export default new Ticker();
