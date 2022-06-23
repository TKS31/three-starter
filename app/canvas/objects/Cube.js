import * as THREE from 'three';
import Canvas from '../Canvas';
import Time from '../../utils/Time';

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

  update() {
    this.mesh.rotation.x += Time.delta;
    this.mesh.rotation.y += Time.delta;
  }
}