import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Plane from './webgl/objects/Plane.js';
import Webgl from './webgl/Webgl.js';
import ResizeManager from './utils/ResizeManager.js';
import Ticker from './utils/Ticker.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.loader = new TextureLoader();
    this.gltfLoader = new GLTFLoader();
    this.plane = new Plane();
    Webgl.scene.add(this.plane.mesh);
    this.addEvents();
    Ticker.add(this.update, this, 1);
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
    Webgl.update();
    this.plane.update({ elapsedTime });
  }

  addEvents() {
    ResizeManager.add(this.onResize, this, 1);
  }

  onResize() {
    Webgl.onResize();
    this.plane.onResize();
  }
}

new App();