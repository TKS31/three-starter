import Plane from './canvas/objects/Plane.js';
import useCanvas from './canvas/useCanvas.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.canvas = useCanvas();
    this.plane = new Plane();
    this.canvas.scene.add(this.plane.mesh);
    this.timeoutId = null;
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  update() {
    this.canvas.update();

    if (this.plane) this.plane.update();

    window.requestAnimationFrame(this.update.bind(this));
  }

  addEvents() {
    window.addEventListener('resize', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.onResize.bind(this), 200);
    });
  }

  onResize() {
    this.canvas.onResize();

    if (this.plane) this.plane.onResize();
  }
}

new App();