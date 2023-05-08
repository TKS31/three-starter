import { PlaneGeometry, ShaderMaterial, Mesh } from "three";
import vertexShader from '../shaders/plane/vertex.glsl';
import fragmentShader from '../shaders/plane/fragment.glsl';

export class Plane {
  constructor() {
    const geometry = new PlaneGeometry();
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader
    });

    this.mesh = new Mesh(geometry, material);
  }
}