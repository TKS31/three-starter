export function EventEmitter() {
  const callbacks = new Map();

  function on(type, callback) {
    if (!callbacks.has(type)) {
      callbacks.set(type, new Set());
    }
    
    const callbackList = callbacks.get(type);
    callbackList.add(callback);
  }

  function emit(type, ...args) {
    if (!callbacks.has(type)) return;

    const callbackList = callbacks.get(type);

    callbackList.forEach(callback => {
      callback(...args);
    });
  }

  function off(type, callback) {
    if (!callbacks.has(type)) return;

    const callbackList = callbacks.get(type);

    callbackList.forEach(cb => {
      if (cb === callback) {
        callbackList.delete(cb);
      }
    });
  }

  return () => {
    return {
      on,
      emit,
      off
    }
  }
}

export const useEventEmitter = EventEmitter();
