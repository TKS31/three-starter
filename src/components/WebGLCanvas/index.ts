import { ComponentProps } from '@/types/ComponentProps';
import { $ } from '@/utils/dom';
import { WebGL } from '@/webgl/WebGL';

export default class WebGLCanvas {
  el: Element
  props: ComponentProps
  webgl: WebGL
  rafId: number
  
  constructor(selector: string, props: ComponentProps = {}) {
    this.el = $(selector)
    this.props = props
    this.webgl = new WebGL(this.el)
    this.el.appendChild(this.webgl.canvas)
    this.el.addEventListener('resize', this.handleResize.bind(this))
    this.rafId = requestAnimationFrame(this.update.bind(this))
  }

  update() {
    this.webgl.update()
    this.rafId = requestAnimationFrame(this.update.bind(this))
  }

  handleResize() {
    this.webgl.resize()
  }
}