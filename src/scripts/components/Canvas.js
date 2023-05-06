import { $ } from "../helpers/dom";
import { getSize } from "../helpers/getSize";
import { createPlane } from '../webgl/objects/createPlane';
import { useWebGL } from "../webgl/useWebGL";

export function Canvas() {
  const dom = {
    wrapper: $('.canvas-wrapper')
  };
  
  const { width, height, dpr } = getSize();

  const webgl = useWebGL({ width, height, dpr });
  const el = webgl.canvas;

  dom.wrapper.appendChild(el);

  const plane = createPlane();
  webgl.add(plane);

  function raf() {
    webgl.render();
  }

  function resize({ width, height, dpr }) {
    webgl.resize({ width, height, dpr });
  }

  return {
    el,
    dom,
    raf,
    resize
  }
}