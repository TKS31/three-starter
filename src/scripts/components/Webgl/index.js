import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { $ } from '../../helpers/dom';
import { Plane } from './Plane';

export class WebGL {
  constructor({ alpha = true }) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new WebGLRenderer({ alpha });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.setSize(width, height);

    this.camera = new PerspectiveCamera(45, width / height, .1, 100);
    this.camera.position.z = 10;

    this.scene = new Scene();

    this.plane = new Plane();
    this.scene.add(this.plane.mesh);

    this.el = this.renderer.domElement;
    this.refs = {
      wrapper: $('.js-webgl-wrapper')
    };
    this.refs.wrapper.appendChild(this.el);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize(width, height, dpr) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
  }
}