export class GamepadInput {
  static buttons: boolean[] = [];

  static update() {
    const pad = navigator.getGamepads()[0];
    if (!pad) return;

    pad.buttons.forEach((b, i) => {
      this.buttons[i] = b.pressed;
    });
  }

  static isPressed(btn: number): boolean {
    return !!this.buttons[btn];
  }
}
