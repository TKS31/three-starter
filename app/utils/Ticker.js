let instance;

export default class Ticker {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._targetFPS = 60;
    this._minFPS = 60;
    this._targetDeltaTime = 1 / this._targetFPS;
    this._deltaTime = 0;
    this._elapsedTime = 0;
    this._previousTime = null;
    this._speed = 1;
    this._maxSpeed = this._targetFPS / this._minFPS;
    this._callbackList = [];
    window.requestAnimationFrame(this.update);
  }

  static get instance() {
    if (!instance) instance = new Ticker();
    return instance;
  }

  static get elapsedTime() {
    return this.instance._elapsedTime;
  }

  static get deltaTime() {
    return this.instance._deltaTime;
  }

  static get speed() {
    return this.instance._speed;
  }

  static add({ callback, index }) {
    if (index) {
      this.instance._callbackList.splice(index, 0, callback);
    } else {
      this.instance._callbackList.push(callback);
    }
  }

  static remove({ callback }) {
    this.instance._callbackList = this.instance._callbackList.filter(fn => fn !== callback);
  }

  update = (timestamp) => {
    if (!this._previousTime) this._previousTime = timestamp;
    this._elapsedTime = timestamp / 1000;
    this._deltaTime = (timestamp - this._previousTime) / 1000;
    this._previousTime = timestamp;
    this._speed = Math.min(this._deltaTime / this._targetDeltaTime, this._maxSpeed);
    for (let i = 0; i < this._callbackList.length; i++) {
      this._callbackList[i]({ elapsedTime: this._elapsedTime, deltaTime: this._deltaTime, speed: this._speed });
    }
    window.requestAnimationFrame(this.update);
  }
}