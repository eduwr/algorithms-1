export class IllegalArgumentException {
  constructor(msg: string) {
    throw new Error(msg || "Illegal Arguments");
  }
}
