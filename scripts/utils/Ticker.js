import { nanoid } from 'nanoid';

class Ticker {
  #targetFPS = 60;
  #minFPS = 30;
  #deltaTime = 0;
  #elapsedTime = 0;
  #previousTime = null;
  #speed = 1;
  #maxSpeed = this.#targetFPS / this.#minFPS;
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

  get speed() {
    return this.#speed;
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
    this.#speed = Math.min(this.#deltaTime * this.#targetFPS, this.#maxSpeed);

    if (this.#callbacks.length) {
      for (let i = 0; i < this.#callbacks.length; i++) {
        this.#callbacks[i].callback({
          elapsedTime: this.#elapsedTime,
          deltaTime: this.#deltaTime,
          speed: this.#speed
        });
      }
    }

    window.requestAnimationFrame(this.#update.bind(this));
  }
}

export default new Ticker();
