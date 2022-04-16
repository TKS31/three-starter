const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);  
}
`;

const fragmentShader = `
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv.x, vUv.y, 0., 1.);
}
`;

export { vertexShader, fragmentShader };