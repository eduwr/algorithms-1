import { IllegalArgumentException } from "./Exceptions";
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
  constructor(n: number, trials: number) {
    if (!isBiggerThanZero(n, trials)) {
      throw new IllegalArgumentException(
        "n and trials must be bigger than zero"
      );
    }
  }

  public mean(): number {
    return 0;
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
    console.log(stats);
  }
}
