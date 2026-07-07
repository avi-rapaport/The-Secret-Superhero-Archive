import { readData, saveData } from "./io.js";

export async function getHeroes() {
  const data = await readData();
  return data;
}
