type ComponentsMap = {
  [key: number]: number[];
};

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

  get componentsMap() {
    return this.components.reduce(
      (acc, curr, idx) => ({
        ...acc,
        [curr]: [...(Array.isArray(acc[curr]) ? acc[curr] : []), idx],
      }),
      {} as ComponentsMap
    );
  }

  /**
   * @param {number} p - Receives a number within the components array
   * @return {number} Returns the componentId in which `p` is connected
   */
  find(p: number) {
    if (!this.withinRange(p)) {
      throw new Error(`input must be within 0 and ${this.N - 1}`);
    }

    return this.components[p];
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

    return this.components[p] === this.components[q];
  }

  union(p: number, q: number) {
    const pId = this.components[p];
    const qId = this.components[q];

    for (let i = 0; i <= this.N; i++) {
      if (this.components[i] === pId) this.components[i] = qId;
    }
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
