import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shader.js';

export default class Mesh {
  constructor(scene) {
    this.scene = scene;
    this.el = null;
    this.createMesh();
  }

  getParams(el) {
    const rect = el.getBoundingClientRect();
    const scale = {
      x: rect.width,
      y: rect.height,
      z: 1
    };
    const pos = {
      x: rect.left - window.innerWidth / 2 + rect.width / 2,
      y: -rect.top + window.innerHeight / 2 - rect.height / 2,
      z: 0
    };
    return [scale, pos];
  }

  createMesh() {
    const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
      },
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  onResize() {
  }

  update() {
  }
}