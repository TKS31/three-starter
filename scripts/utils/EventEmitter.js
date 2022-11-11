let instance;

export default class EventEmitter {
  #listeners = new Map();

  constructor() {
    if (instance) return instance;
    instance = this;
  }

  static get instance() {
    return instance || (instance = new EventEmitter());
  }

  static on(type, listener) {
    if (!this.instance.#listeners.has(type)) {
      this.instance.#listeners.set(type, new Set());
    }
    const listenerSet = this.instance.#listeners.get(type);
    listenerSet.add(listener);
  }

  static emit(type, ...args) {
    const listenerSet = this.instance.#listeners.get(type);
    if (!listenerSet) return;

    if (args) {
      listenerSet.forEach(listener => {
        listener(...args);
      });
    } else {
      listenerSet.forEach(listener => {
        listener();
      });
    }
  }

  static remove(type, listener) {
    const listenerSet = this.instance.#listeners.get(type);
    if (!listenerSet) return;

    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}