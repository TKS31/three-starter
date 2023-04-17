class EventEmitter {
  constructor() {
    this.callbacks = new Map();
  }

  on(type, callback) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, new Set());
    }
    
    const callbackList = this.callbacks.get(type);
    callbackList.add(callback);
  }

  emit(type, ...args) {
    if (!this.callbacks.has(type)) return;

    const callbackList = this.callbacks.get(type);

    callbackList.forEach(callback => {
      callback(...args);
    });
  }

  remove(type, callback) {
    if (!this.callbacks.has(type)) return;

    const callbackList = this.callbacks.get(type);

    callbackList.forEach(cb => {
      if (cb === callback) {
        callbackList.delete(cb);
      }
    });
  }
}

const eventEmitter = new EventEmitter();

export { eventEmitter as EventEmitter };
