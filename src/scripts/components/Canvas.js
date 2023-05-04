import { WebGLRenderer, PerspectiveCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { $ } from "../helpers/dom";
import { Plane } from '../webgl/objects/Plane';

export class Canvas {
  constructor() {
    this.el = $('.canvas');

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer = new WebGLRenderer({
      canvas: this.el,
      alpha: false
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);

    this.camera = new PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );
    this.camera.position.z = 10;

    this.scene = new Scene();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.plane = new Plane();
    this.scene.add(this.plane.mesh);
  }

  raf() {
    this.renderer.render(this.scene, this.camera);
  }

  resize({ width, height, dpr }) {
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}