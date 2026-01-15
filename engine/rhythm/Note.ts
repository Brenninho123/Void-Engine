import { Conductor } from "./Conductor";

export class Note {
  time: number;
  lane: number;
  y: number = -100;
  hit: boolean = false;

  constructor(time: number, lane: number) {
    this.time = time;
    this.lane = lane;
  }

  update(scrollSpeed: number) {
    const diff = this.time - Conductor.songPosition;
    this.y = 400 - diff * scrollSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.hit) return;

    ctx.fillStyle = "white";
    ctx.fillRect(200 + this.lane * 100, this.y, 60, 20);
  }
}