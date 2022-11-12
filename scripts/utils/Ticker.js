let instance;

export default class Ticker {
  #targetFPS = 60;
  #minFPS = 30;
  #deltaTime = 0;
  #elapsedTime = 0;
  #previousTime;
  #speed = 1;
  #maxSpeed = this.#targetFPS / this.#minFPS;
  #listenerList = [];

  constructor() {
    window.requestAnimationFrame(this.#update.bind(this));
  }

  static get instance() {
    return instance || (instance = new Ticker());
  }

  static get elapsedTime() {
    return this.instance.#elapsedTime;
  }

  static get deltaTime() {
    return this.instance.#deltaTime;
  }

  static get speed() {
    return this.instance.#speed;
  }

  static add(fn, context, index) {
    const listener = { fn, context };
    if (index) {
      this.instance.#listenerList.splice(index - 1, 0, listener);
    } else {
      this.instance.#listenerList.push(listener);
    }
  }

  static remove(fn, context) {
    this.instance.#listenerList = this.instance.#listenerList.filter(listener => {
      return !(listener.fn === fn && listener.context === context);
    });
  }

  #update(timestamp) {
    if (!this.#previousTime) this.#previousTime = timestamp;
    this.#elapsedTime = timestamp / 1000;
    this.#deltaTime = (timestamp - this.#previousTime) / 1000;
    this.#previousTime = timestamp;
    this.#speed = Math.min(this.#deltaTime * this.#targetFPS, this.#maxSpeed);

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