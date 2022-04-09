import * as THREE from 'three';
import { vertexShaderSource, fragmentShaderSource } from './shaderSource.js';
import ImagePlane from './imagePlane.js';

class App {
  constructor(canvasEl, imageElements) {
    this.imageElements = imageElements;
    this.imagePlaneList = [];
    this.canvasSize = {
      w: window.innerWidth,
      h: window.innerHeight
    };

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);
    this.loader = new THREE.TextureLoader();
    
    const fov = 60;
    const fovInRad = (fov * Math.PI) / 180;
    // 途中式
    // Math.tan(fovInRadian)        = (height / 2) / dist;
    // Math.tan(fovInRadian) * dist = (height / 2);
    const dist = this.canvasSize.h / 2 / Math.tan(fovInRad / 2);
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.canvasSize.w / this.canvasSize.h,
      0.1,
      1000
    );
    this.camera.position.z = dist;

    this.timeoutId = null;
  }

  init() {
    this.imageElements.forEach(imageEl => {
      const mesh = this.createMesh(imageEl);
      this.scene.add(mesh);
      const viewSize = this.getViewSize();
      const imagePlane = new ImagePlane(mesh, imageEl, viewSize);
      imagePlane.setParams();
      this.imagePlaneList.push(imagePlane);
    });

    window.addEventListener('resize', () => {
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.onResize.bind(this), 200);
    });

    this.render();
  }

  getViewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );
    return { width: height * this.camera.aspect, height: height };
  }

  createMesh(imageEl) {
    const texture = this.loader.load(imageEl.src);
    const uniforms = {};
    const geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  render() {
    this.imagePlaneList.forEach(imagePlane => {
      imagePlane.update();
    });
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  onResize() {
    this.canvasSize = {
      w: window.innerWidth,
      h: window.innerHeight
    };

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);

    this.camera.aspect = this.canvasSize.w / this.canvasSize.h;
    this.camera.updateProjectionMatrix();
    const fov = 60;
    const fovInRad = (fov * Math.PI) / 180;
    const dist = this.canvasSize.h / 2 / Math.tan(fovInRad / 2);
    this.camera.position.z = dist;

    const viewSize = this.getViewSize();
    this.imagePlaneList.forEach(imagePlane => {
      imagePlane.onResize(viewSize);
    });
  }
}

const app = new App(
  // canvasEl,
  // imageElements
);
app.init();