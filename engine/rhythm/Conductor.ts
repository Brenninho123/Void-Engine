import { AudioManager } from "../audio/AudioManager";

export class Conductor {
  static bpm = 120;
  static crochet = 0;
  static songPosition = 0;

  static init(bpm: number) {
    this.bpm = bpm;
    this.crochet = (60 / bpm) * 1000;
  }

  static update() {
    this.songPosition = AudioManager.getTimeMs();
  }
}