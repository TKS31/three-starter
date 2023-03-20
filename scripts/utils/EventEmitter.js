class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    const listenerList = this.listeners.get(type);
    listenerList.add(listener);
  }

  emit(type, ...args) {
    if (!this.listeners.has(type)) return;

    const listenerList = this.listeners.get(type);

    if (args) {
      listenerList.forEach(listener => {
        listener(...args);
      });
    } else {
      listenerList.forEach(listener => {
        listener();
      });
    }
  }

  remove(type, listener) {
    if (!this.listeners.has(type)) return;
    const listenerList = this.#listeners.get(type);

    listenerList.forEach(ownListener => {
      if (ownListener === listener) {
        listenerList.delete(listener);
      }
    });
  }
}

const eventEmitter = new EventEmitter();

export { eventEmitter as EventEmitter };
