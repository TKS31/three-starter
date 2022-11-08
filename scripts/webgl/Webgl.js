import { Scene } from 'three';
import Renderer from './environment/Renderer.js';
import Camera from './environment/Camera.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Webgl {
  #scene = new Scene();
  #renderer = new Renderer();
  #camera = new Camera();
  #viewPort = this.#camera.viewPort;
  #controls = new OrbitControls(this.#camera, this.#renderer.domElement);

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

  update() {
    this.#renderer.render(this.#scene, this.#camera);
  }

  onResize() {
    this.#renderer.onResize();
    this.#camera.onResize();
    this.#viewPort = this.#camera.viewPort;
  }
}

export default new Webgl();