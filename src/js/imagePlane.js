export default class ImagePlane {
  constructor(mesh, imageEl, viewSize) {
    this.mesh = mesh;
    this.imageEl = imageEl;
    this.viewSize = viewSize;
  }

  setParams() {
    const rect = this.imageEl.getBoundingClientRect();
    
    // ピクセル単位をカメラの視野単位に変換
    const widthViewUnit = (rect.width * this.viewSize.width) / window.innerWidth;
    const heightViewUnit = (rect.height * this.viewSize.height) / window.innerHeight;
    let xViewUnit = (rect.left * this.viewSize.width) / window.innerWidth;
    let yViewUnit = (rect.top * this.viewSize.height) / window.innerHeight;
    
    // 原点を中央にする
    xViewUnit = xViewUnit - this.viewSize.width / 2;
    yViewUnit = yViewUnit - this.viewSize.height / 2;

    // rectの原点を中央にする
    const x = xViewUnit + widthViewUnit / 2;
    const y = -yViewUnit - heightViewUnit / 2;

    // meshのプロパティを設定
    const mesh = this.mesh;
    mesh.scale.x = widthViewUnit;
    mesh.scale.y = heightViewUnit;
    mesh.position.x = x;
    mesh.position.y = y;
  }

  update() {
    this.setParams();
  }

  onResize(viewSize) {
    this.viewSize = viewSize;
  }
}