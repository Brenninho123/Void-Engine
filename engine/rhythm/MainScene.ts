import { Scene } from "../../engine/core/Scene";
import { Conductor } from "../../engine/rhythm/Conductor";
import { StrumLine } from "../../engine/rhythm/StrumLine";
import { TestChart } from "../../engine/rhythm/Chart";

export class MainScene extends Scene {
  strum = new StrumLine();

  create() {
    Conductor.init(120);
    this.strum.notes = TestChart;
  }

  update(dt: number) {
    Conductor.update(dt * 1000);
    this.strum.update();
  }

  render(ctx: CanvasRenderingContext2D) {
    this.strum.draw(ctx);
  }
}