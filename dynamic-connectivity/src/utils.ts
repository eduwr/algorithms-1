export const pipe =
  (...xs: Function[]) =>
  (x: unknown) =>
    xs.reduce((a, b) => b(a), x);
