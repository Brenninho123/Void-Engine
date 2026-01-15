import { Input } from "../core/Input";
import { Conductor } from "./Conductor";
import { judge } from "./Judgement";
import { Score } from "./Score";

export class StrumLine {
  notes: any[] = [];
  scrollSpeed = 0.45;

  update() {
    for (const note of this.notes) {
      if (note.hit) continue;

      note.update(this.scrollSpeed);

      const diff = note.time - Conductor.songPosition;

      if (Input.isLanePressed(note.lane)) {
        const result = judge(diff);
        if (result !== "MISS") {
          note.hit = true;
          Score.add(result);
          console.log(result, "Combo:", Score.combo);
        }
      }

      if (diff < -150) {
        note.hit = true;
        Score.add("MISS" as any);
      }
    }
  }
}