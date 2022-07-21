import path from "node:path";
import { Client } from "./Client";
import UF from "./UF";
import process from "node:process";

const inputUrl = path.resolve(__dirname, "input.txt");

function main() {
  const client = new Client(inputUrl);

  const uf = new UF(client.N);

  client.connections.forEach(([p, q]) => {
    if (!uf.connected(p, q)) {
      uf.union(p, q);
      console.log(p + " " + q);
    }
  });

  console.log(uf.componentsMap);

  const testConnections = [
    [1, 6],
    [3, 5],
    [8, 9],
    [0, 1],
    [4, 7],
  ];

  testConnections.forEach(([p, q]) => {
    console.log(
      `${p} - ${q} : ${uf.connected(p, q) ? "Connected!" : "NOT Connected"}`
    );
  });
}

main();
