class Ticker {
  #targetFPS = 60;
  #minFPS = 30;
  #targetDeltaTime = 1 / this.#targetFPS;
  #deltaTime = 0;
  #elapsedTime = 0;
  #previousTime;
  #speed = 1;
  #maxSpeed = this.#targetFPS / this.#minFPS;
  #listenerList = [];

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

  #update(timestamp) {
    if (!this.#previousTime) this.#previousTime = timestamp;
    this.#elapsedTime = timestamp / 1000;
    this.#deltaTime = (timestamp - this.#previousTime) / 1000;
    this.#previousTime = timestamp;
    this.#speed = Math.min(this.#deltaTime / this.#targetDeltaTime, this.#maxSpeed);

    if (this.#listenerList.length) {
      for (let i = 0; i < this.#listenerList.length; i++) {
        const listener = this.#listenerList[i];
        listener.fn.call(
          listener.context,
          { elapsedTime: this.#elapsedTime, deltaTime: this.#deltaTime, speed: this.#speed }
        );
      }
    }

    window.requestAnimationFrame(this.#update.bind(this));
  }
}

export default new Ticker();