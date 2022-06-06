import Canvas from './canvas/Canvas.js';

class App {
  constructor() {
    this.canvas = new Canvas();
    this.timeoutId = null;
    this.startTime = null;
    this.addEvents();
    this.update();
  }

  update(timestamp = 0) {
    if (!this.startTime) this.startTime = timestamp;
    const elapsedTime = (timestamp - this.startTime) / 1000;
    this.startTime = timestamp;
    if (this.canvas) {
      this.canvas.update({ elapsedTime });
    }
    requestAnimationFrame(this.update.bind(this));
  }

  addEvents() {
    window.addEventListener('resize', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.onResize.bind(this), 200);
    });
  }

  onResize() {
    if (this.canvas) {
      this.canvas.onResize();
    }
  }
}

new App();