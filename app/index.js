import Canvas from './canvas/Canvas.js';

class App {
  constructor() {
    this.getElement();
    this.canvas = new Canvas();
    this.setPromises();
    this.loadImages();
    this.timeoutId = null;

    window.addEventListener('resize', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.onResize.bind(this), 200);
    });

    this.update();
  }

  getElement() {
    this.imageElements = [];
    const elements = document.querySelectorAll('.image');
    [...elements].forEach(element => {
      this.imageElements.push(
        { element: element, image: element.dataset.src }
      );
    });
  }

  setPromises() {
    this.promises = this.imageElements.map(element => {
      return this.canvas.loadTexture(
        { element: element.element, image: element.image }
      );
    });
  }

  loadImages() {
    Promise.all(this.promises).then(results => {
      this.canvas.onLoad(results);
    });
  }

  update() {
    if (this.canvas) {
      this.canvas.update();
    }
    requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    if (this.canvas) {
      this.canvas.onResize();
    }
  }
}

new App();