import UF from "./UF";

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

  constructor(n: number) {
    this.uf = new UF(n ** 2 + 2);

    for (let i = 1; i <= n; i++) {
      this.uf.union(0, i);
      this.uf.union(this.uf.N - 1, this.uf.N - 1 - i);
    }
  }

  public open(row: number, col: number): void {}

  public isOpen(row: number, col: number): boolean {
    return true;
  }

  public isFull(row: number, col: number): boolean {
    return true;
  }

  public numberOfOpenSites(): number {
    return 0;
  }

  public percolates(): boolean {
    return true;
  }

  public static main(...args: String[]): void {
    const percolation = new Percolation(4);

    console.log(percolation.uf.components);
    console.log(percolation.uf.connected(0, 1));
    console.log(percolation.uf.connected(0, 2));
    console.log(percolation.uf.connected(0, 3));
    console.log(percolation.uf.connected(0, 4));
    console.log(percolation.uf.connected(0, 5));
    console.log(percolation.uf.connected(17, 16));
    console.log(percolation.uf.connected(17, 15));
    console.log(percolation.uf.connected(17, 14));
    console.log(percolation.uf.connected(17, 13));
    console.log(percolation.uf.connected(17, 12));
  }
}

Percolation.main();
