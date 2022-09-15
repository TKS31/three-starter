class Ticker {
  #targetFPS = 60;
  #minFPS = 60;
  #targetDeltaTime = 1 / this.#targetFPS;
  #deltaTime = 0;
  #elapsedTime = 0;
  #previousTime;
  #speed = 1;
  #maxSpeed = this.#targetFPS / this.#minFPS;
  #callbackList = [];

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

  add({ callback, index }) {
    if (index) {
      this.#callbackList.splice(index, 0, callback);
    } else {
      this.#callbackList.push(callback);
    }
  }

  remove({ callback }) {
    this.#callbackList = this.#callbackList.filter(fn => fn !== callback);
  }

  #update(timestamp) {
    if (!this.#previousTime) this.#previousTime = timestamp;
    this.#elapsedTime = timestamp / 1000;
    this.#deltaTime = (timestamp - this.#previousTime) / 1000;
    this.#previousTime = timestamp;
    this.#speed = Math.min(this.#deltaTime / this.#targetDeltaTime, this.#maxSpeed);
    if (this.#callbackList.length) {
      for (let i = 0; i < this.#callbackList.length; i++) {
        this.#callbackList[i]({ elapsedTime: this.#elapsedTime, deltaTime: this.#deltaTime, speed: this.#speed });
      }
    }
    window.requestAnimationFrame(this.#update.bind(this));
  }
}

export default new Ticker();