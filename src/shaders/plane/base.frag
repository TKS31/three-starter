uniform float uTime;

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(sin(length(vUv * 2. - 1.) * 10. - uTime), 1., 1., 1.);
}