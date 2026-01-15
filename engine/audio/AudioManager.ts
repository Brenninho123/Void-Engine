export class AudioManager {
  static context = new AudioContext();
  static buffer: AudioBuffer | null = null;
  static source: AudioBufferSourceNode | null = null;
  static startTime = 0;
  static pausedAt = 0;
  static playing = false;

  static async load(url: string) {
    const res = await fetch(url);
    const array = await res.arrayBuffer();
    this.buffer = await this.context.decodeAudioData(array);
  }

  static play() {
    if (!this.buffer) return;

    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);

    this.startTime = this.context.currentTime - this.pausedAt;
    this.source.start(0, this.pausedAt);

    this.playing = true;
  }

  static pause() {
    if (!this.playing) return;

    this.pausedAt = this.context.currentTime - this.startTime;
    this.source?.stop();
    this.playing = false;
  }

  static getTimeMs(): number {
    if (!this.playing) return this.pausedAt * 1000;
    return (this.context.currentTime - this.startTime) * 1000;
  }
}
