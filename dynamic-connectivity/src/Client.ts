import fs from "node:fs";
import { pipe } from "./utils";

const lines = (s: string) =>
  s
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const parseConnections = (a: string[]) =>
  a.map((conn) => conn.split(" ").map((val) => parseInt(val)));

export class Client {
  private rawData: string;
  public N: number;
  public connections: number[][];

  constructor(inputUrl: string) {
    this.rawData = fs.readFileSync(inputUrl, "utf-8");

    const [[N], ...connections] = pipe(
      lines,
      parseConnections
    )(this.rawData) as number[][];

    this.N = N;
    this.connections = connections;
  }
}
