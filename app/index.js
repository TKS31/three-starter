import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Plane from './canvas/objects/Plane.js';
import useCanvas from './canvas/useCanvas.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.canvas = useCanvas();
    this.loader = new TextureLoader();
    this.gltfLoader = new GLTFLoader();
    this.plane = new Plane();
    this.canvas.scene.add(this.plane.mesh);
    this.timeoutId = null;
    this.addEvents();
    window.requestAnimationFrame(this.update.bind(this));
  }

  loadTexture({ path }) {
    return new Promise(resolve => {
      this.loader.load(path, texture => {
        resolve(texture);
      });
    });
  }

  loadModel({ path }) {
    return new Promise(resolve => {
      this.gltfLoader.load(path, gltf => {
        resolve(gltf);
      });
    });
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