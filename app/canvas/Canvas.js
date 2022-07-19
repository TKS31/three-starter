import { Scene } from 'three';
import Renderer from './environment/Renderer.js';
import Camera from './environment/Camera.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let instance = null;

export default class Canvas {
  constructor() {
    if (instance) return instance;
    instance = this;
    this._scene = new Scene();
    this._renderer = new Renderer();
    this._camera = new Camera();
    this._viewSize = this._camera.viewSize;
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
  }

  static get instance() {
    if (!instance) instance = new Canvas();
    return instance;
  }

  static get scene() {
    return this.instance._scene;
  }

  static get renderer() {
    return this.instance._renderer;
  }

  static get camera() {
    return this.instance._camera;
  }

  static get viewSize() {
    return this.instance._viewSize;
  }

  static update() {
    this.renderer.render(this.scene, this.camera);
  }

  static onResize() {
    this.renderer.onResize();
    this.camera.onResize();

    this.instance._viewSize = this.camera.viewSize;
  }
}