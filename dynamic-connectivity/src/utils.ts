export const pipe =
  (...xs: Function[]) =>
  (x: unknown) =>
    xs.reduce((a, b) => b(a), x);

export const isBiggerThanZero = (...args: Array<string | number>) =>
  args.every((arg) => {
    const argToNbr = Number(arg);
    return Number.isInteger(argToNbr) && argToNbr > 0;
  });
