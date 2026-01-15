export enum Judgement {
  SICK = "SICK",
  GOOD = "GOOD",
  BAD = "BAD",
  MISS = "MISS"
}

export function judge(diff: number): Judgement {
  diff = Math.abs(diff);

  if (diff <= 45) return Judgement.SICK;
  if (diff <= 90) return Judgement.GOOD;
  if (diff <= 135) return Judgement.BAD;
  return Judgement.MISS;
}