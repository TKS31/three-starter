let instance = null;

export default class Time {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._previous = null;
    this._delta = 0;
    this._start = Date.now();
    this._elapsed = 0;
  }

  static get instance() {
    if (!instance) instance = new Time();
    return instance;
  }

  static get previous() {
    return this.instance._previous;
  }

  static set previous(time) {
    this.instance._previous = time;
  }

  static get delta() {
    return this.instance._delta;
  }

  static set delta(time) {
    this.instance._delta = time;
  }

  static get start() {
    return this.instance._start;
  }

  static get elapsed() {
    return this.instance._eplapsed;
  }

  static set elapsed(time) {
    this.instance._eplapsed = time;
  }
}