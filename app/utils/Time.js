let instance = null;

export default class Time {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._targetFPS = 60;
    this._targetDelta = 1 / this._targetFPS;
    this._delta = 0;
    this._elapsed = 0;
    this._previous = null;
    this._speed = 1;
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

  static update({ timestamp }) {
    if (!this.instance._previous) this.instance._previous = timestamp;
    this.instance._elapsed = timestamp / 1000;
    this.instance._delta = (timestamp - this.instance._previous) / 1000;
    this.instance._previous = timestamp;
    this.instance._speed = this.instance._delta / this.instance._targetDelta;
  }
}