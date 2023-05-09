import { $ } from "../helpers/dom";
import { getWindowSize } from "../helpers/getWindowSize";
import { Plane } from '../webgl/objects/Plane';
import { WebGL } from "../webgl/WebGL";

export class Canvas {
  constructor() {
    this.refs = {
      wrapper: $('.canvas-wrapper')
    };

    const { width, height, dpr } = getWindowSize();

    this.webgl = new WebGL({ width, height, dpr });
    this.el = this.webgl.canvas;

    this.refs.wrapper.appendChild(this.el);

    const plane = new Plane();
    this.webgl.add(plane.mesh);
  }

  raf() {
    this.webgl.render();
  }

  resize({ width, height, dpr }) {
    this.webgl.resize({ width, height, dpr });
  }
}