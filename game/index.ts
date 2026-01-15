import { Engine } from "../engine/core/Engine";
import { MainScene } from "./scenes/MainScene";
import { ChartEditor } from "../engine/editor/ChartEditor";

const engine = new Engine();

if (location.hash === "#editor") {
  engine.setScene(new ChartEditor());
} else {
  engine.setScene(new MainScene());
}

engine.start();
