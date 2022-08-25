import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Plane from './canvas/objects/Plane.js';
import useCanvas from './canvas/useCanvas.js';
import Size from './utils/Size.js';
import Ticker from './utils/Ticker.js';

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
    this.addEvents();
    Ticker.add({ callback: this.update });
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

  update = ({ elapsedTime, deltaTime, speed }) => {
    this.canvas.update();
    this.plane.update({ elapsedTime });
  }

  addEvents() {
    this.addResizeHandler();
  }

  addResizeHandler() {
    Size.addResizeHandler({ callback: this.canvas.onResize, index: 0 });
    Size.addResizeHandler({ callback: this.plane.onResize });
  }
}

new App();