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

  static get targetFPS() {
    return this.instance._targetFPS;
  }

  static get targetDelta() {
    return this.instance._targetDelta;
  }

  static get delta() {
    return this.instance._delta;
  }

  static set delta(time) {
    this.instance._delta = time;
  }

  static get previous() {
    return this.instance._previous;
  }

  static set previous(time) {
    this.instance._previous = time;
  }

  static get elapsed() {
    return this.instance._eplapsed;
  }

  static set elapsed(time) {
    this.instance._eplapsed = time;
  }

  static get speed() {
    return this.instance._speed;
  }

  static set speed(speed) {
    this.instance._speed = speed;
  }

  static update(timestamp) {
    if (!Time.previous) Time.previous = timestamp;
    Time.elapsed = timestamp / 1000;
    Time.delta = (timestamp - Time.previous) / 1000;
    Time.previous = timestamp;
    Time.speed = Time.delta / Time.targetDelta;
  }
}