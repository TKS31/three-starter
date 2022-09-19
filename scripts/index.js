import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Plane from './canvas/objects/Plane.js';
import Canvas from './canvas/Canvas.js';
import ResizeManager from './utils/ResizeManager.js';
import Ticker from './utils/Ticker.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.canvas = Canvas;
    this.loader = new TextureLoader();
    this.gltfLoader = new GLTFLoader();
    this.plane = new Plane();
    this.canvas.scene.add(this.plane.mesh);
    this.addEvents();
    Ticker.add(this.update.bind(this), 0);
  }

  loadTexture(path) {
    return new Promise(resolve => {
      this.loader.load(path, texture => {
        resolve(texture);
      });
    });
  }

  loadModel(path) {
    return new Promise(resolve => {
      this.gltfLoader.load(path, gltf => {
        resolve(gltf);
      });
    });
  }

  update({ elapsedTime, deltaTime, speed }) {
    this.canvas.update();
    this.plane.update({ elapsedTime });
  }

  addEvents() {
    ResizeManager.add(this.onResize.bind(this), 0);
  }

  onResize() {
    this.canvas.onResize();
    this.plane.onResize();
  }
}

new App();