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
  constructor(n: number, trials: number) {}

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

  public static main(...args: String[]): void {}
}
