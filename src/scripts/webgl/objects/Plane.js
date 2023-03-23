import { PlaneGeometry, ShaderMaterial, Mesh } from "three";
import vertexShader from '../shaders/plane/vertex.glsl?raw';
import fragmentShader from '../shaders/plane/fragment.glsl?raw';

export class Plane {
  constructor() {
    this.create();
  }

  create() {
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