abstract class AbstractUF {
  abstract union: (p: number, q: number) => void;
  abstract connected: (p: number, q: number) => boolean;
  abstract find: (p: number) => number;
  abstract count: () => number;
}

export default class UF implements AbstractUF {
  public readonly N: number;

  constructor(N: number) {
    this.N = N;
  }

  find(p: number) {
    return p;
  }

  count() {
    return 0;
  }

  connected(p: number, q: number) {
    return false;
  }

  union(p: number, q: number) {}
}
