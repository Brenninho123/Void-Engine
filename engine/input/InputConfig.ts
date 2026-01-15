export type LaneAction = "LEFT" | "DOWN" | "UP" | "RIGHT";

export interface InputBindings {
  keyboard: Record<LaneAction, string>;
  gamepad: Record<LaneAction, number>;
}

export class InputConfig {
  static STORAGE_KEY = "void_engine_input";

  static default(): InputBindings {
    return {
      keyboard: {
        LEFT: "ArrowLeft",
        DOWN: "ArrowDown",
        UP: "ArrowUp",
        RIGHT: "ArrowRight"
      },
      gamepad: {
        LEFT: 14,
        DOWN: 13,
        UP: 12,
        RIGHT: 15
      }
    };
  }

  static load(): InputBindings {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : this.default();
  }

  static save(cfg: InputBindings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cfg));
  }
}
