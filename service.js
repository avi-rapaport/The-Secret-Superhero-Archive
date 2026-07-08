import { readData, saveData } from "./io.js";

export async function getHeroes(
  status,
  power,
  minLevel,
  maxLevel,
  search,
  sortBy,
  order,
  page,
  limit,
) {
  let data = await readData();
  if (status) data = data.filter((hero) => hero.status === status);
  if (power) data = data.filter((hero) => hero.powers.includes(power));
  if (minLevel) data = data.filter((hero) => hero.threatLevel >= minLevel);
  if (maxLevel) data = data.filter((hero) => hero.threatLevel <= maxLevel);
  if (search)
    data = data.filter(
      (hero) => hero.codeName.includes(search) || hero.notes.includes(search),
    );
  if (sortBy)
    data = data.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === "number") {
        return order === "desc" ? valB - valA : valA - valB;
      }

      if (!isNaN(Date.parse(valA)) && typeof valA === "string") {
        const diff = new Date(valA) - new Date(valB);
        return order === "desc" ? -diff : diff;
      }

      const comp = String(valA).localeCompare(String(valB));
      return order === "desc" ? -comp : comp;
    });

  return data;
}

export async function getHeroById(heroId) {
  const data = await readData();
  return data.find((hero) => hero.id === heroId);
}

export async function createHero(body) {
  const heroes = await readData();
  const hero = {
    id: heroes.length > 0 ? heroes[heroes.length - 1].id + 1 : 1,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  heroes.push(hero);
  await saveData(heroes);
  return hero.id;
}
