import { Note } from "./Note";
import { Conductor } from "./Conductor";
import { Input } from "../core/Input";

export class StrumLine {
  notes: Note[] = [];
  scrollSpeed = 0.45;

  hitWindow = 150; // ms

  update() {
    this.notes.forEach(note => note.update(this.scrollSpeed));

    this.notes.forEach(note => {
      if (note.hit) return;

      const diff = Math.abs(note.time - Conductor.songPosition);
      if (diff < this.hitWindow) {
        if (Input.isLanePressed(note.lane)) {
          note.hit = true;
          console.log("HIT");
        }
      }

      if (Conductor.songPosition - note.time > this.hitWindow) {
        note.hit = true;
        console.log("MISS");
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.notes.forEach(n => n.draw(ctx));

    // Receptores
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "cyan";
      ctx.strokeRect(200 + i * 100, 400, 60, 20);
    }
  }
}