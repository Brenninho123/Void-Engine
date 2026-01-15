export class Input {
  static keys: Record<string, boolean> = {};

  // 🎹 Teclado
  static initKeyboard() {
    window.addEventListener("keydown", e => {
      Input.keys[e.key] = true;
    });

    window.addEventListener("keyup", e => {
      Input.keys[e.key] = false;
    });
  }

  // 📱 Touch (mobile)
  static initTouch() {
    window.addEventListener("touchstart", e => {
      for (let i = 0; i < e.touches.length; i++) {
        const x = e.touches[i].clientX;
        const lane = Math.floor(x / (window.innerWidth / 4));
        Input.keys["lane" + lane] = true;
      }
    });

    window.addEventListener("touchend", () => {
      Input.keys = {};
    });
  }

  // 🔘 Tecla genérica
  static isPressed(key: string): boolean {
    return !!Input.keys[key];
  }

  // 🎶 Lane FNF (teclado + touch)
  static isLanePressed(lane: number): boolean {
    const keyboardMap = [
      "ArrowLeft",
      "ArrowDown",
      "ArrowUp",
      "ArrowRight"
    ];

    return (
      !!Input.keys[keyboardMap[lane]] ||
      !!Input.keys["lane" + lane]
    );
  }

  // 🚀 Inicialização geral
  static init() {
    Input.initKeyboard();
    Input.initTouch();
  }
}