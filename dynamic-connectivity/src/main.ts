import path from "node:path";
import { Client } from "./Client";
import UF from "./UF";

const inputUrl = path.resolve(__dirname, "input.txt");

type GroupsMap = {
  [key: number]: number[];
};

function main() {
  const client = new Client(inputUrl);

  const uf = new UF(client.N);

  client.connections.forEach(([p, q]) => {
    if (!uf.connected(p, q)) {
      uf.union(p, q);
      console.log(p + " " + q);
    }
  });

  const groupMap = uf.components.reduce(
    (acc, curr, idx) => ({
      ...acc,
      [curr]: [...(Array.isArray(acc[curr]) ? acc[curr] : []), idx],
    }),
    {} as GroupsMap
  );

  console.log(groupMap);
}

main();
