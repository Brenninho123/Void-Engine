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

static isPressed(key: string) {
  return !!Input.keys[key];
}

static initTouch() {
  window.addEventListener("touchstart", e => {
    const x = e.touches[0].clientX;
    const lane = Math.floor(x / (window.innerWidth / 4));
    Input.keys["lane" + lane] = true;
  });

  window.addEventListener("touchend", () => {
    Input.keys = {};
  });
}