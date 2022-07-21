type ComponentsMap = {
  [key: number]: number[];
};

type SizesMap = {
  [key: number]: number;
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
  public sizes: SizesMap = {};

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
      // Root compression
      this.components[root] = this.components[this.components[root]];
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

    if (pRoot === qRoot) return;

    if (!this.sizes[pRoot]) {
      this.sizes[pRoot] = 1;
    }

    if (!this.sizes[qRoot]) {
      this.sizes[qRoot] = 1;
    }

    if (this.sizes[pRoot] < this.sizes[qRoot]) {
      this.components[pRoot] = qRoot;
      this.sizes[qRoot] += this.sizes[pRoot];
      delete this.sizes[pRoot];
      return;
    }

    this.components[qRoot] = pRoot;
    this.sizes[pRoot] += this.sizes[qRoot];
    delete this.sizes[qRoot];
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
