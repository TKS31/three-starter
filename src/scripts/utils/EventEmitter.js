 export class EventEmitter {
  static callbacks = new Map();

  static on(type, callback) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, new Set());
    }
    
    const callbackList = this.callbacks.get(type);
    callbackList.add(callback);
  }

  static emit(type, ...args) {
    if (!this.callbacks.has(type)) return;

    const callbackList = this.callbacks.get(type);

    callbackList.forEach(callback => {
      callback(...args);
    });
  }

  static off(type, callback) {
    if (!this.callbacks.has(type)) return;

    const callbackList = this.callbacks.get(type);

    callbackList.forEach(cb => {
      if (cb === callback) {
        callbackList.delete(cb);
      }
    });
  }
}
