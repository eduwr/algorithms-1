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
  private readonly n;
  private readonly trials;
  private readonly totalSites;
  private percolationThresholds: number[] = [];
  private _mean = 0;
  private _stddev = 0;

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

    this.repeatUntilReachNbrOfTrials();
  }

  private resetPercolation() {
    this.percolation = new Percolation(this.n);
  }

  private getRandomPoint(max = this.n, min = 1) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private findPercolationThreshold() {
    this.resetPercolation();
    while (!this.percolation.percolates()) {
      const row = this.getRandomPoint();
      const col = this.getRandomPoint();

      this.percolation.open(row, col);
    }

    return this.percolation.numberOfOpenSites() / this.totalSites;
  }

  private repeatUntilReachNbrOfTrials() {
    let currentTrials = 0;

    while (currentTrials !== this.trials) {
      console.log(`Trial ${currentTrials}/${this.trials}`);
      const percolationThreshold = this.findPercolationThreshold();
      this.percolationThresholds.push(percolationThreshold);
      currentTrials++;
    }
  }

  public mean(): number {
    if (this._mean) {
      return this._mean;
    }

    this._mean = this.percolationThresholds.reduce((acc, curr) => {
      return acc + curr / this.trials;
    }, 0);

    return this._mean;
  }

  public stddev(): number {
    if (this._stddev) {
      return this._stddev;
    }
    const mean = this.mean();
    this._stddev = this.percolationThresholds.reduce((acc, curr) => {
      return acc + (curr - mean) ** 2 / (this.trials - 1);
    }, 0);

    return this._stddev;
  }

  public confidenceLo(): number {
    return (
      this.mean() - (1.96 * Math.sqrt(this.stddev())) / Math.sqrt(this.trials)
    );
  }

  public confidenceHi(): number {
    return (
      this.mean() + (1.96 * Math.sqrt(this.stddev())) / Math.sqrt(this.trials)
    );
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

    const mean = stats.mean();
    const stddev = stats.stddev();
    const confidenceLow = stats.confidenceLo();
    const confidenceHi = stats.confidenceHi();
    const results = {
      mean,
      stddev,
      confidenceLow,
      confidenceHi,
    };
    console.table(results);
  }
}
