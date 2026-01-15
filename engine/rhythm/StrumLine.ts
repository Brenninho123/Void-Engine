import { Input } from "../core/Input";
import { Conductor } from "./Conductor";
import { judge, Judgement } from "./Judgement";
import { Score } from "./Score";
import { Note } from "./Note";

export class StrumLine {
  notes: Note[] = [];
  scrollSpeed = 0.45;

  downscroll = true;
  receptorY = 400;

  update() {
    const dir = this.downscroll ? 1 : -1;

    for (const note of this.notes) {
      if (note.hit) continue;

      // 🔽 Atualiza posição da nota (scroll)
      note.y =
        this.receptorY +
        dir * (Conductor.songPosition - note.time) * this.scrollSpeed;

      const diff = note.time - Conductor.songPosition;

      // 🎯 HIT
      if (Input.isLanePressed(note.lane)) {
        const result = judge(diff);

        if (result !== Judgement.MISS) {
          note.hit = true;
          Score.add(result);
          console.log(result, "Combo:", Score.combo);
        }
      }

      // ❌ MISS automático
      if (diff < -150) {
        note.hit = true;
        Score.add(Judgement.MISS);
      }
    }
  }
}