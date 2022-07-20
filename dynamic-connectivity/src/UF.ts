abstract class AbstractUF {
  abstract union: (p: number, q: number) => void;
  abstract connected: (p: number, q: number) => boolean;
  abstract find: (p: number) => number;
  abstract count: () => number;
}

export default class UF implements AbstractUF {
  find(p: number) {
    return p;
  }

  count() {
    return 0;
  }

  connected(p: number, q: number) {
    return true;
  }

  union(p: number, q: number) {}
}
