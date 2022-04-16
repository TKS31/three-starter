const vertexShaderSource = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);  
}
`;

const fragmentShaderSource = `
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv.x, vUv.y, 0., 1.);
}
`;

export { vertexShaderSource, fragmentShaderSource };