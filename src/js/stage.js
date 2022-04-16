import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Stage {
  constructor() {
    this.setScene();
    this.setRenderer();
    this.setCamera();
    this.setControls();
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  setCamera() {
    const fov = 60;
    const fovInRad = (fov / 2) * Math.PI / 180;
    const dist = (window.innerHeight / 2) / Math.tan(fovInRad);
    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = dist;
  }

  setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    const fovInRad = (this.camera.fov / 2) * Math.PI / 180;
    const dist = (height / 2) / Math.tan(fovInRad);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.camera.position.z = dist;
  }
}