import { IllegalArgumentException } from "./Exceptions";
import { Percolation } from "./Percolation";
import { isBiggerThanZero } from "./utils";

abstract class AbstractPercolationStats {
  // Constructor
  // perform independent trials on an n-by-n grid
  // public PercolationStats(int n, int trials)

  // sample mean of percolation threshold
  public abstract mean(): number;

  // sample standard deviation of percolation threshold
  public abstract stddev(): number;

  // low endpoint of 95% confidence interval
  public abstract confidenceLo(): number;

  // high endpoint of 95% confidence interval
  public abstract confidenceHi(): number;

  // test client (see below)
  //  public static void main(String[] args)
}

export class PercolationStats implements AbstractPercolationStats {
  private percolation: Percolation;
  private n;
  private trials;
  private totalSites;
  public openSites = 0;

  constructor(n: number, trials: number) {
    if (!isBiggerThanZero(n, trials)) {
      throw new IllegalArgumentException(
        "n and trials must be bigger than zero"
      );
    }

    this.percolation = new Percolation(n);
    this.n = n;
    this.totalSites = n ** 2;
    this.trials = trials;
  }

  private getRandomPoint(max = this.n, min = 1) {
    const randompoint = Math.floor(Math.random() * (max - min) + min);

    return randompoint;
  }

  private iterateUntilPercolate() {
    console.log(this.n);
    console.log(this.percolation.uf.N);

    let percolates = false;

    while (!percolates || this.totalSites !== this.openSites) {
      const row = this.getRandomPoint();
      const col = this.getRandomPoint();
      console.log("while", this.totalSites, row, col, this.openSites);

      if (!this.percolation.isOpen(row, col)) {
        this.percolation.open(row, col);
        this.openSites++;

        if (this.percolation.percolates()) {
          percolates = true;
        }
      }
    }
  }

  public mean(): number {
    this.iterateUntilPercolate();

    return this.openSites / this.totalSites;
  }

  public stddev(): number {
    return 0;
  }

  public confidenceLo(): number {
    return 0;
  }

  public confidenceHi(): number {
    return 0;
  }

  public static main(): void {
    const args = process.argv.slice(2, 4);

    if (!isBiggerThanZero(...args)) {
      throw new IllegalArgumentException(
        "n and T must be positive integer numbers"
      );
    }
    const [n, T] = args.map((arg) => Number(arg));

    const stats = new PercolationStats(n, T);

    const total = stats.mean();
    console.log("TOTAL: ", total);
  }
}
