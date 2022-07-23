// https://coursera.cs.princeton.edu/algs4/assignments/percolation/specification.php

import { IllegalArgumentException } from "./Exceptions";
import UF from "./UF";
import { isBiggerThanZero } from "./utils";


abstract class AbstractPercolation {
  // CONSTRUCTOR :: creates n-by-n grid, with all sites initially blocked

  // opens the site (row, col) if it is not open already
  public abstract open(row: number, col: number): void;

  // is the site (row, col) open?
  public abstract isOpen(row: number, col: number): boolean;

  // is the site (row, col) full?
  public abstract isFull(row: number, col: number): boolean;

  // returns the number of open sites
  public abstract numberOfOpenSites(): number;

  // does the system percolate?
  public abstract percolates(): boolean;

  // test client (optional)
  // public abstract main(args: String[]): void;
}



export class Percolation implements AbstractPercolation {
  uf: UF;
  n: number;
  openSites = 0;
  isOpenMap = new Map<`${number}-${number}`, boolean>()

  constructor(n: number) {
    this.n = n;
    this.uf = new UF(this.n ** 2 + 2);

    for (let i = 1; i <= n; i++) {
      this.uf.union(0, i);
      this.uf.union(this.uf.N - 1, this.uf.N - 1 - i);
    }
  }

  private getIndex(row: number, col: number) {
    if (row <= 0 || row > this.n) return;
    if (col <= 0 || col > this.n) return;
    return this.n * (row - 1) + col;
  }

  private getNeighbors(row: number, col: number) {
    const middle = this.getIndex(row, col);
    const top = this.getIndex(row - 1, col);
    const right = this.getIndex(row, col + 1);
    const bottom = this.getIndex(row + 1, col);
    const left = this.getIndex(row, col - 1);
    return [middle, top, right, bottom, left].filter(Boolean) as number[];
  }

  private withinRange(...numbers: number[]) {
    return numbers
      .map((n) => n > 0 && n <= this.uf.N - 2)
      .every((n) => n);
  }

  public open(row: number, col: number): void {
    if (!this.withinRange(row, col)) {
      throw new IllegalArgumentException(
        `inputs [${row} and ${col}] must be within 1 and ${this.uf.N - 2}`
      );
    }

    const [center, ...neighbors] = this.getNeighbors(row, col);

    neighbors.forEach((neighbor) => this.uf.union(center, neighbor));
    this.openSites++;
    this.isOpenMap.set(`${row}-${col}`, true);
  }

  public isOpen(row: number, col: number): boolean {
    if (!this.withinRange(row, col)) {
      throw new IllegalArgumentException(
        `inputs [${row} and ${col}] must be within 1 and ${this.uf.N - 2}`
      );
    }

    return !!this.isOpenMap.get(`${row}-${col}`);
  }

  public isFull(row: number, col: number): boolean {
    if (!this.withinRange(row, col)) {
      throw new IllegalArgumentException(
        `inputs [${row} and ${col}] must be within 1 and ${this.uf.N - 2}`
      );
    }

    const index = this.getIndex(row, col);

    if (!index) {
      return false;
    }

    return this.uf.connected(0, index);
  }

  public numberOfOpenSites(): number {
    return this.openSites;
  }

  public percolates(): boolean {
    return this.uf.connected(0, this.uf.N - 1);
  }

  public static main(): void {
    const [size] = process.argv.slice(2, 3);

    if (!isBiggerThanZero(size)) {
      throw new IllegalArgumentException(
        "Size must be positive integer number"
      );
    }

    const percolation = new Percolation(Number(size));

    const hasTopConnected = Array.from(
      { length: percolation.n },
      (_, k) => k + 1
    )
      .map((val) => percolation.uf.connected(0, val))
      .every((val) => val);

    console.log("Has top connected? ", hasTopConnected);

    const hasBottomConnected = Array.from(
      { length: percolation.n },
      (_, k) => percolation.n ** 2 - k
    )
      .map((val) => percolation.uf.connected(percolation.uf.N - 1, val))
      .every((val) => val);

    console.log("Has Bottom connected? ", hasBottomConnected);

    const areSecondAndBeforeLastRowDisconnected = [
      [0, percolation.n + 1],
      [percolation.uf.N - 1, percolation.n ** 2 - percolation.n],
    ]
      .map(([first, second]) => percolation.uf.connected(first, second))
      .every((val) => !val);

    console.log(
      "Are Second And Before Last Row Disconnected? ",
      areSecondAndBeforeLastRowDisconnected
    );

    console.log("Percolates?", percolation.percolates());
    console.log("Array length: ", percolation.uf.components.length);

    // Test open and isOpen methods

    console.log("Is 2, 2 open? ", percolation.isOpen(2, 2));
    console.log("Calling open...");
    percolation.open(2, 4);
    console.log("Is 2, 4 open? ", percolation.isOpen(2, 2));
    console.log("Is 3, 4 open? ", percolation.isOpen(3, 4));
    console.log("Calling open...");
    percolation.open(4, 4);
    console.log("Is 4, 5 open? ", percolation.isOpen(3, 4));
    percolation.open(6, 4);
    console.log("Is 6, 4 open? ", percolation.isOpen(3, 4));
    percolation.open(8, 4);
    console.log("Is 8, 4 open? ", percolation.isOpen(3, 4));
    percolation.open(9, 4);
    console.log("Is 9, 4 open? ", percolation.isOpen(3, 4));
    percolation.open(10, 4);
    console.log("percolates?", percolation.percolates())


    console.log("matrix: ");
    const matrix = percolation.uf.components.reduce((acc, curr, idx) => {
      const idxString = `${curr}`.padStart(3, " ")
      if(idx === 0) {
        return `${idxString}\n`
      }

      if((idx) % Number(size) === 0) {
        return `${acc} ${idxString}\n`
      }

      return `${acc} ${idxString}`
    }, "")
    console.log(matrix)

  }
}
