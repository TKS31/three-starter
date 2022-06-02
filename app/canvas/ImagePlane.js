import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default class ImagePlane {
  constructor({ element, texture, viewSize }) {
    this.element = element;
    this.texture = texture;
    this.viewSize = viewSize;
    this.rect = this.getRect();
    this.createMesh();
  }

  getRect() {
    const rect = this.element.getBoundingClientRect();
    const width = this.viewSize.width * rect.width / window.innerWidth;
    const height = this.viewSize.height * rect.height / window.innerHeight;
    const x = this.viewSize.width * (rect.left + (rect.width / 2) - (window.innerWidth / 2)) / window.innerWidth;
    const y = this.viewSize.height * (-rect.top - (rect.height / 2) + (window.innerHeight / 2)) / window.innerHeight;
    return { x, y, width, height };
  }

  createMesh() {
    const geometry = new THREE.PlaneBufferGeometry(
      this.rect.width,
      this.rect.height,
      32,
      32
    );
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTexture: { value: this.texture }
      },
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(this.rect.x, this.rect.y, 0);
  }

  onResize(viewSize) {
    this.viewSize = viewSize;
    const previousRect = this.rect;
    this.rect = this.getRect();

    const scaleX = this.rect.width / previousRect.width;
    const scaleY = this.rect.height / previousRect.height;

    this.mesh.position.set(this.rect.x, this.rect.y, 0);
    this.mesh.scale.set(scaleX, scaleY, 1);
  }

  update() {
  }
}