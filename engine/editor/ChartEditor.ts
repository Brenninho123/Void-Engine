import { Scene } from "../core/Scene";
import { AudioManager } from "../audio/AudioManager";
import { Conductor } from "../rhythm/Conductor";
import { Note } from "../rhythm/Note";

export class ChartEditor extends Scene {
  notes: Note[] = [];
  currentLane = 0;

  create() {
    AudioManager.play();
  }

  update() {
    Conductor.update();

    if (window.onkeydown) {
      if (event.key === "ArrowLeft") this.currentLane = 0;
      if (event.key === "ArrowDown") this.currentLane = 1;
      if (event.key === "ArrowUp") this.currentLane = 2;
      if (event.key === "ArrowRight") this.currentLane = 3;

      if (event.key === " ") {
        this.notes.push(
          new Note(Conductor.songPosition, this.currentLane)
        );
      }

      if (event.key === "s") this.save();
    }
  }

  save() {
    const data = {
      bpm: Conductor.bpm,
      notes: this.notes.map(n => ({
        time: n.time,
        lane: n.lane
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chart.json";
    a.click();
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillText("EDITOR MODE", 20, 30);
  }
}
