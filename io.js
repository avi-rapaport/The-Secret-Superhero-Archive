import fs from "fs/promises";

const filePath = "heroes.json";

export async function readData() {
  const data = await fs.readFile(filePath, "utf8");
  if (!data.trim()) return [];
  return JSON.parse(data);
}

export async function saveData(content) {
  const data = JSON.stringify(content);
  await fs.writeFile(filePath, data);
}
