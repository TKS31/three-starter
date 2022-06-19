import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import Canvas from '../Canvas';

export default class Cube {
  constructor() {
    this.createMesh();
  }

  createMesh() {
    const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    const material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    Canvas.scene.add(this.mesh);
  }

  onResize() {
  }

  update({ deltaTime }) {
    this.mesh.rotation.x += deltaTime;
    this.mesh.rotation.y += deltaTime;
  }
}