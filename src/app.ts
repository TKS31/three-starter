import WebGL from '@/components/WebGL';

function app() {
  const webgl = new WebGL();

  window.addEventListener('resize', handleResize);
  requestAnimationFrame(raf);

  function handleResize() {
    webgl.resize();
  }

  function raf() {
    webgl.render();
  }
}

app();