export class EventEmitter {
  constructor() {
    this.callbacks = new Map();
  }

  on = (type, callback) => {
    const { callbacks } = this;
    
    if (!callbacks.has(type)) {
      callbacks.set(type, new Set());
    }

    const list = callbacks.get(type);
    list.add(callback);
  }

  emit = (type, ...args) => {
    const { callbacks } = this;
    
    if (!callbacks.has(type))
      return;

    const list = callbacks.get(type);

    list.forEach(callback => {
      callback(...args);
    });
  }

  off = (type, callback) => {
    const { callbacks } = this;
    
    if (!callbacks.has(type))
      return;

    const list = callbacks.get(type);

    list.forEach(cb => {
      if (cb === callback) {
        list.delete(cb);
      }
    });
  }
}
