import fs from "node:fs";

export default async () => {
  if (fs.existsSync("state.json")) fs.unlinkSync("state.json");
};
