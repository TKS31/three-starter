import * as THREE from 'three';
import Size from './utils/Size.js';
import Renderer from './environment/Renderer.js';
import Camera from './environment/Camera.js';
import Cube from './objects/Cube.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Canvas {
  constructor() {
    this.size = new Size();
    this.scene = new THREE.Scene();
    this.renderer = new Renderer({ size: this.size });
    this.camera = new Camera({ size: this.size });
    this.viewSize = this.camera.getViewSize();
    this.controls = new OrbitControls(this.camera.instance, this.renderer.instance.domElement);
    this.createCube();
  }

  createCube() {
    this.cube = new Cube({ viewSize: this.viewSize });
    this.scene.add(this.cube.mesh);
  }

  update({ elapsedTime }) {
    if (this.cube) {
      this.cube.update({ elapsedTime });
    }
    this.renderer.update({ scene: this.scene, camera: this.camera.instance });
  }

  onResize() {
    this.size.onResize();

    this.renderer.onResize({ size: this.size });
    this.camera.onResize({ size: this.size });

    this.viewSize = this.camera.getViewSize();

    if (this.cube) {
      this.cube.onResize({ viewSize: this.viewSize });
    }
  }
}