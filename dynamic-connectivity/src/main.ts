import path from "node:path";
import { Client } from "./Client";

const inputUrl = path.resolve(__dirname, "input.txt");

function main() {
  const client = new Client(inputUrl);

  console.log(client.N, client.connections);
}

main();
