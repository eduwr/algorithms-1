type ComponentsMap = {
  [key: number]: number[];
};

abstract class AbstractUF {
  abstract components: number[];
  abstract union: (p: number, q: number) => void;
  abstract connected: (p: number, q: number) => boolean;
  abstract root: (p: number) => number;
  abstract count: () => number;
}

export default class UF implements AbstractUF {
  public readonly N: number;
  public components: number[];

  constructor(N: number) {
    this.N = N;
    this.components = Array.from({ length: this.N }, (_, k) => k);
  }

  get componentsMap() {
    return this.components.reduce((acc, curr, idx) => {
      const root = this.root(curr);

      return {
        ...acc,
        [root]: [...(Array.isArray(acc[root]) ? acc[root] : []), idx],
      };
    }, {} as ComponentsMap);
  }

  /**
   * @param {number} p - Receives a number within the components array
   * @return {number} Returns the root of `p`
   */
  root(p: number) {
    if (!this.withinRange(p)) {
      throw new Error(`input must be within 0 and ${this.N - 1}`);
    }

    let root = this.components[p];

    while (this.components[root] !== root) {
      root = this.components[root];
    }

    return root;
  }

  /**
   * @param {number} p - Number to be compared with q
   * @param {number} q - Number to be compared with p
   * @return {boolean} Returns true if the input values are connected
   */
  connected(p: number, q: number) {
    if (!this.withinRange(p, q)) {
      throw new Error(
        `inputs [${p} and ${q}] must be within 0 and ${this.N - 1}`
      );
    }

    return this.root(p) === this.root(q);
  }

  union(p: number, q: number) {
    const pRoot = this.root(p);
    const qRoot = this.root(q);

    this.components[pRoot] = qRoot;
  }

  count() {
    return 0;
  }

  private withinRange(...numbers: number[]) {
    return numbers
      .map((n) => n >= 0 && n <= this.N - 1)
      .every((n) => n === true);
  }
}
