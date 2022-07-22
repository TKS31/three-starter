let instance = null;

export default class Time {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._targetFPS = 60;
    this._minFPS = 60;
    this._targetDelta = 1 / this._targetFPS;
    this._delta = 0;
    this._elapsed = 0;
    this._previous = null;
    this._speed = 1;
    this._maxSpeed = this._targetFPS / this._minFPS;
    window.requestAnimationFrame(this.update.bind(this));
  }

  static get instance() {
    if (!instance) instance = new Time();
    return instance;
  }

  static get delta() {
    return this.instance._delta;
  }

  static get elapsed() {
    return this.instance._elapsed;
  }

  static get speed() {
    return this.instance._speed;
  }

  update(timestamp) {
    if (!this._previous) this._previous = timestamp;
    this._elapsed = timestamp / 1000;
    this._delta = (timestamp - this._previous) / 1000;
    this._previous = timestamp;
    this._speed = Math.min(this._delta / this._targetDelta, this._maxSpeed);
  }
}