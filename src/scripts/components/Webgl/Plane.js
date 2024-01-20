import { ShaderMaterial } from "three";
import { PlaneGeometry } from "three";
import { Mesh } from "three";
import vertexShader from './shaders/plane.vert';
import fragmentShader from './shaders/plane.frag';

export class Plane {
  constructor() {
    this.mesh = new Mesh(
      new PlaneGeometry(2, 2),
      new ShaderMaterial({
        vertexShader,
        fragmentShader
      })
    );
  }
}