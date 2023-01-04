import { nanoid } from 'nanoid';

class Ticker {
  #targetFPS;
  #minFPS;
  #deltaTime;
  #elapsedTime;
  #previousTime;
  #deltaRatio;
  #maxDeltaRatio;
  #callbacks;

  constructor() {
    this.#targetFPS = 60;
    this.#minFPS = 30;
    this.#deltaTime = 0;
    this.#elapsedTime = 0;
    this.#previousTime = null;
    this.#deltaRatio = 1;
    this.#maxDeltaRatio = this.#targetFPS / this.#minFPS;
    this.#callbacks = [];
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

const ticker = new Ticker();

export { ticker as Ticker };
