import { Scene } from 'three';
import Renderer from './environment/Renderer.js';
import Camera from './environment/Camera.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let instance;

export default class Webgl {
  #scene = new Scene();
  #renderer = new Renderer();
  #camera = new Camera();
  #viewPort = this.#camera.viewPort;
  #controls = new OrbitControls(this.#camera, this.#renderer.domElement);

  constructor() {
    if (instance) return instance;
    instance = this;
  }

  static get instance() {
    return instance || (instance = new Webgl());
  }

  static get scene() {
    return this.instance.#scene;
  }

  static get renderer() {
    return this.instance.#renderer;
  }

  static get camera() {
    return this.instance.#camera;
  }

  static get viewPort() {
    return this.instance.#viewPort;
  }

  static update() {
    this.renderer.render(this.scene, this.camera);
  }

  static onResize() {
    this.renderer.onResize();
    this.camera.onResize();
    this.instance.#viewPort = this.camera.viewPort;
  }
}
