import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ImagePlane from './ImagePlane.js';

export default class Canvas {
  constructor() {
    this.setSize();
    this.setLoader();
    this.createScene();
    this.createRenderer();
    this.createCamera();
    this.viewSize = this.getViewSize();
    this.createControls();
  }

  setSize() {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  setLoader() {
    this.loader = new THREE.TextureLoader();
  }

  loadTexture({ element, image }) {
    return new Promise(resolve => {
      this.loader.load(image, texture => {
        resolve({ element, texture });
      });
    });
  }

  onLoad(imageElements) {
    this.createImagePlane(imageElements);
  }

  createImagePlane(imageElements) {
    this.imagePlanes = imageElements.map(element => {
      return new ImagePlane({
        element: element.element,
        texture: element.texture,
        viewSize: this.viewSize
      });
    });
    this.imagePlanes.forEach(imagePlane => {
      this.scene.add(imagePlane.mesh);
    });
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
      100
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

  update() {
    if (this.imagePlanes) {
      this.imagePlanes.forEach(imagePlane => {
        imagePlane.update();
      })
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

    if (this.imagePlanes) {
      this.imagePlanes.forEach(imagePlane => {
        imagePlane.onResize(this.viewSize);
      });
    }
  }
}