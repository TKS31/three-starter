import { Scene } from 'three';
import Renderer from './environment/Renderer.js';
import Camera from './environment/Camera.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Ticker } from '../utils/Ticker.js';
import { Size } from '../utils/Size.js';

let instance;

class Webgl {
  #scene = new Scene();
  #renderer = new Renderer();
  #camera = new Camera();
  #viewPort = this.#camera.viewPort;
  #controls = new OrbitControls(this.#camera, this.#renderer.domElement);

  constructor() {
    this.resizeId = Size.addResizeHandler(this.onResize.bind(this), 10);
    this.tickId = Ticker.add(this.update.bind(this), 10);
  }

  update() {
    this.#renderer.render(this.#scene, this.#camera);
  }

  onResize() {
    this.#renderer.onResize();
    this.#camera.onResize();
    this.#viewPort = this.#camera.viewPort;
  }

  get scene() {
    return this.#scene;
  }

  get renderer() {
    return this.#renderer;
  }

  get camera() {
    return this.#camera;
  }

  get viewPort() {
    return this.#viewPort;
  }
}

const useWebgl = () => {
  return instance || (instance = new Webgl());
};

export default useWebgl;
