import { Scene } from "./Scene";
import { Time } from "./Time";

export class Engine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scene!: Scene;

  constructor(w = 1280, h = 720) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = w;
    this.canvas.height = h;
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d")!;
  }

  setScene(scene: Scene) {
    this.scene = scene;
    scene.engine = this;
    scene.create();
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time: number) {
    Time.update(time);
    this.scene?.update(Time.delta);
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scene?.render(this.ctx);
  }
}
