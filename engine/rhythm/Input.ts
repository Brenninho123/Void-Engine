export class Input {
  static keys: Record<string, boolean> = {};

  static init() {
    window.addEventListener("keydown", e => {
      Input.keys[e.key] = true;
    });
    window.addEventListener("keyup", e => {
      Input.keys[e.key] = false;
    });
  }

  static isLanePressed(lane: number): boolean {
    const map = ["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"];
    return !!Input.keys[map[lane]];
  }
}