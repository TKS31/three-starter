import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Plane from './webgl/objects/Plane.js';
import useWebgl from './webgl/useWebgl.js';
import { Size } from './utils/Size.js';
import { Ticker } from './utils/Ticker.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    this.loader = new TextureLoader();
    this.gltfLoader = new GLTFLoader();
    this.plane = new Plane();
    const { scene } = useWebgl();
    scene.add(this.plane.mesh);
    this.addEvents();
    this.tickId = Ticker.add(this.update.bind(this));
    
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

  update({ elapsedTime, deltaTime, deltaRatio }) {
    this.plane.update({ elapsedTime });
  }

  addEvents() {
    this.resizeId = Size.addResizeHandler(this.onResize.bind(this));
  }

  onResize() {
    this.plane.onResize();
  }
}

new App();