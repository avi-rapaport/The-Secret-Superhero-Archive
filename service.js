import { readData, saveData } from "./io.js";

export async function getHeroes() {
  const data = await readData();
  return data;
}

export async function getHeroById(heroId) {
  const data = await readData();
  return data.find((hero) => hero.id === heroId);
}
