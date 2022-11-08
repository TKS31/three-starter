class EventEmitter {
  #listeners = new Map();

  on(type, listener) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
    }
    const listenerSet = this.#listeners.get(type);
    listenerSet.add(listener);
  }

  emit(type, ...args) {
    const listenerSet = this.#listeners.get(type);
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

  remove(type, listener) {
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) return;

    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}

export default new EventEmitter();