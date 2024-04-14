import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'

export class WebGL {
  wrapper: Element
  width: number
  height: number
  dpr: number
  canvas: HTMLCanvasElement
  scene: Scene
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  
  constructor(wrapper: Element) {
    this.wrapper = wrapper
    this.width = this.wrapper.clientWidth
    this.height = this.wrapper.clientHeight
    this.dpr = Math.min(window.devicePixelRatio, 2)

    this.renderer = new WebGLRenderer({
      alpha: true,
    })
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height)
    this.canvas = this.renderer.domElement
    
    this.camera = new PerspectiveCamera(
      45,
      this.width / this.height,
      .1,
      100
    )

    this.scene = new Scene()
  }

  update() {
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.width = this.wrapper.clientWidth
    this.height = this.wrapper.clientHeight
    this.dpr = Math.min(window.devicePixelRatio, 2)
    
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height)

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }
}