import { PlaneGeometry, ShaderMaterial, Mesh } from "three";
import vertexShader from '../shaders/plane/vertex.glsl';
import fragmentShader from '../shaders/plane/fragment.glsl';

export default class Plane {
  constructor() {
    this.createMesh();
  }

  createMesh() {
    const geometry = new PlaneGeometry(5, 5, 64, 64);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 }
      }
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
  }

  update({ elapsedTime }) {
    this.mesh.material.uniforms.uTime.value = elapsedTime;
  }

  onResize() {
  }
}