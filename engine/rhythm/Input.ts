import { InputConfig, LaneAction } from "./InputConfig";
import { GamepadInput } from "./GamepadInput";

export class Input {
  static keys: Record<string, boolean> = {};
  static lanes: Record<LaneAction, boolean> = {
    LEFT: false,
    DOWN: false,
    UP: false,
    RIGHT: false
  };

  static config = InputConfig.load();

  // 🎹 Teclado
  static initKeyboard() {
    window.addEventListener("keydown", e => {
      Input.keys[e.key] = true;
    });
    window.addEventListener("keyup", e => {
      Input.keys[e.key] = false;
    });
  }

  // 📱 Touch (áreas fixas)
  static initTouch() {
    window.addEventListener("touchstart", e => {
      for (const t of Array.from(e.touches)) {
        const lane = Math.floor(t.clientX / (innerWidth / 4));
        Input.setLane(lane, true);
      }
    });

    window.addEventListener("touchend", () => {
      Input.resetLanes();
    });
  }

  static setLane(lane: number, state: boolean) {
    const map: LaneAction[] = ["LEFT", "DOWN", "UP", "RIGHT"];
    Input.lanes[map[lane]] = state;
  }

  static resetLanes() {
    Object.keys(Input.lanes).forEach(
      k => (Input.lanes[k as LaneAction] = false)
    );
  }

  // 🔁 Update por frame
  static update() {
    GamepadInput.update();

    // Keyboard
    for (const action in Input.config.keyboard) {
      const key = Input.config.keyboard[action as LaneAction];
      Input.lanes[action as LaneAction] ||= !!Input.keys[key];
    }

    // Gamepad
    for (const action in Input.config.gamepad) {
      const btn = Input.config.gamepad[action as LaneAction];
      Input.lanes[action as LaneAction] ||= GamepadInput.isPressed(btn);
    }
  }

  // 🎶 Gameplay
  static isLanePressed(lane: number): boolean {
    const map: LaneAction[] = ["LEFT", "DOWN", "UP", "RIGHT"];
    return Input.lanes[map[lane]];
  }

  // ⌨️ Genérico
  static isPressed(key: string): boolean {
    return !!Input.keys[key];
  }

  // 🚀 Init geral
  static init() {
    Input.initKeyboard();
    Input.initTouch();
  }
}