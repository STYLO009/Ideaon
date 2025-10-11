export default class Smoother {
  constructor(windowSize = 5) {
    this.windowSize = windowSize;
    this.frames = [];
  }

  push(detections) {
    // store only class and bbox and score
    const mapped = detections.map(d => ({ class: d.class, bbox: d.bbox, score: d.score }));
    this.frames.push(mapped);
    if (this.frames.length > this.windowSize) this.frames.shift();
  }

  consensus() {
    // flatten and count by class; keep bbox of highest-scoring instance
    const counts = {};
    for (const frame of this.frames) {
      for (const d of frame) {
        counts[d.class] = counts[d.class] || { count: 0, best: d };
        counts[d.class].count += 1;
        if (d.score > counts[d.class].best.score) counts[d.class].best = d;
      }
    }
    const arr = Object.keys(counts).map(k => ({ class: k, count: counts[k].count, best: counts[k].best }));
    // sort by persistence (count) then best score
    arr.sort((a,b) => b.count - a.count || b.best.score - a.best.score);
    // return bests as detection format: class, score, bbox
    return arr.map(x => ({ class: x.class, score: x.best.score, bbox: x.best.bbox }));
  }
}
