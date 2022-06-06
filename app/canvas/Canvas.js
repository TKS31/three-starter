import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Cube from './Cube.js';

export default class Canvas {
  constructor() {
    this.setSize();
    this.createScene();
    this.createRenderer();
    this.createCamera();
    this.viewSize = this.getViewSize();
    this.createCube();
    this.createControls();
  }

  setSize() {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.size.width / this.size.height,
      0.1,
      20
    );
    this.camera.position.z = 10;
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  getViewSize() {
    const fovInRadian = this.camera.fov * Math.PI / 180;
    const height = Math.tan(fovInRadian / 2) * this.camera.position.z * 2;
    const width = height * this.camera.aspect;
    return { width, height };
  }

  createCube() {
    this.cube = new Cube({ viewSize: this.viewSize });
    this.scene.add(this.cube.mesh);
  }

  update({ elapsedTime }) {
    if (this.cube) {
      this.cube.update({ elapsedTime });
    }
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);

    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();

    this.viewSize = this.getViewSize();

    if (this.cube) {
      this.cube.onResize({ viewSize: this.viewSize });
    }
  }
}