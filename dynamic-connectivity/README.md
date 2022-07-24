# Percolation Threshold of a system


This application uses Monte Carlo Simulation to calculate the percolation threshold of a system based on the proportion of open sites. On this simmulation the system is always a square matrix.


## Classes

### Percolation Stats

run the logic to calculate mean, standard deviance and confidence level of the tests.

### Percolation

creates a matrix system in which is possible to open sites, check if the system can percolate and calculate the number of open sites.

### UF  - (Union Find)

Uses Weighted Union Find algorithm to check whether some points are connected or not, it also can connect points.


## Runnin The Tests

```bash
$ npm start <number_of_lines> <number_of_trials>
```

## Sample Results

All the results will be shown with 50 trials

|                     | 10x10 system        | 20x20 system         | 100x100 system       |
|---------------------|---------------------|----------------------|----------------------|
| mean                | 0.5107999999999999  | 0.4743000000000001   | 0.4570679999999999   |
| stddv               | 0.01686873469387755 | 0.010073734693877547 | 0.001363061404081633 |
| confidenceLow(95%)  | 0.4747991857869852  | 0.4464794107898486   | 0.4468343919462195   |
| confidenceHigh(95%) | 0.5468008142130146  | 0.5021205892101517   | 0.46730160805378035  |