import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

export function loadTexture(path) {
  return new Promise(resolve => {
    textureLoader.load(path, texture => {
      resolve(texture);
    });
  });
}