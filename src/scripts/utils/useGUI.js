import GUI from "lil-gui";

const gui = new GUI();

export function useGUI() {
  return gui;
}

export function useGUIFolder(title) {
  return gui.addFolder(title);
}
