import WebGLApp from "./components/webgl-app";

function app() {
  const webgl = new WebGLApp();

  handleResize();
  window.addEventListener('resize', handleResize);
  
  animate(0);
  
  function handleResize() {
    webgl.resize();
  }
  
  function animate(timestamp: number) {
    webgl.update(timestamp);
    requestAnimationFrame(animate);
  }
}

app();