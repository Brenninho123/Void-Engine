import { Judgement } from "./Judgement";

export class Score {
  static score = 0;
  static combo = 0;

  static add(j: Judgement) {
    switch (j) {
      case Judgement.SICK:
        this.score += 350;
        this.combo++;
        break;
      case Judgement.GOOD:
        this.score += 200;
        this.combo++;
        break;
      case Judgement.BAD:
        this.score += 50;
        this.combo = 0;
        break;
      case Judgement.MISS:
        this.combo = 0;
        break;
    }
  }
}