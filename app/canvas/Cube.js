import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default class Cube {
  constructor({ viewSize }) {
    this.viewSize = viewSize;
    this.createMesh();
  }

  createMesh() {
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
  }

  onResize(viewSize) {
    this.viewSize = viewSize;
  }

  update({ elapsedTime }) {
    this.mesh.rotation.x += elapsedTime;
    this.mesh.rotation.y += elapsedTime;
  }
}