import { Note } from "./Note";

export class ChartLoader {
  static async load(path: string) {
    const res = await fetch(path);
    const data = await res.json();

    return {
      bpm: data.bpm,
      scrollSpeed: data.scrollSpeed,
      notes: data.notes.map(
        (n: any) => new Note(n.time, n.lane, n.length || 0)
      )
    };
  }
}