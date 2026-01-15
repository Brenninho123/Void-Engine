import { Conductor } from "./Conductor";

export class Note {
  time: number;
  lane: number;
  length: number;
  hit = false;

  y = 0;

  constructor(time: number, lane: number, length = 0) {
    this.time = time;
    this.lane = lane;
    this.length = length;
  }

  update(scroll: number, songPos: number) {
    this.y = 400 - (this.time - songPos) * scroll;
  }
}