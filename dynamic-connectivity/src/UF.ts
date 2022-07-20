abstract class AbstractUF {
  abstract components: number[];
  abstract union: (p: number, q: number) => void;
  abstract connected: (p: number, q: number) => boolean;
  abstract find: (p: number) => number;
  abstract count: () => number;
}

export default class UF implements AbstractUF {
  public readonly N: number;
  public components: number[];

  constructor(N: number) {
    this.N = N;
    this.components = Array.from({ length: this.N }, (_, k) => k);
  }

  /**
   * @param {number} p - Receives a number within the components array
   * @return {number} Returns the componentId in which `p` is connected
   */
  find(p: number) {
    if (p < 0 || p > this.components.length - 1) {
      throw new Error(
        `input must be within 0 and ${this.components.length - 1}`
      );
    }

    return this.components[p];
  }

  count() {
    return 0;
  }

  connected(p: number, q: number) {
    return false;
  }

  union(p: number, q: number) {}
}
