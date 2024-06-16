import { Uniforms } from "@/types/uniforms";
import { Mesh, Vector2, PlaneGeometry, ShaderMaterial } from "three";
import vertexShader from './base.vert';
import fragmentShader from './base.frag';

export default class Plane {
  uniforms: Uniforms;
  mesh: Mesh;
  
  constructor() {
    this.uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2() },
    };

    this.mesh = new Mesh(
      new PlaneGeometry(2, 2),
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: this.uniforms
      })
    );
  }

  update(elapsedTime: number) {
    this.uniforms.uTime.value = elapsedTime;
  }
}