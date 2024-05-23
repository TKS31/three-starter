import { type RenderTargetOptions, WebGLRenderTarget } from 'three';

export default class FBO {
  write: WebGLRenderTarget;
  read: WebGLRenderTarget;
  
  constructor(width: number, height: number, options: RenderTargetOptions) {
    this.write = new WebGLRenderTarget(width, height, options);
    this.read = new WebGLRenderTarget(width, height, options);
  }

  swap() {
    const temp = this.write;
    this.write = this.read;
    this.read = temp;
  }
}