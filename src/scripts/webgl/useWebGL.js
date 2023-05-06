import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function useWebGL({ width, height, dpr }) {
  const renderer = new WebGLRenderer();
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height);

  const canvas = renderer.domElement;

  const camera = new PerspectiveCamera(
    45,
    width / height,
    0.1,
    100
  );
  camera.position.z = 10;

  const scene = new Scene();

  const controls = new OrbitControls(camera, canvas);

  function add(...obj) {
    scene.add(...obj);
  }

  function remove(...obj) {
    scene.remove(...obj);
  }

  function render() {
    renderer.render(scene, camera);
  }

  function resize({ width, height, dpr }) {
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  return {
    canvas,
    add,
    remove,
    render,
    resize
  }
}