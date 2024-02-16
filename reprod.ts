import Database from "bun:sqlite";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import * as schema from "./schema.js";

export const db = drizzle(new Database("db.sqlite"), { schema });

migrate(db, { migrationsFolder: "./drizzle" });

await db.insert(schema.users).values({ username: "test" });

const result = await db.query.users.findFirst({
  where: eq(schema.users.username, "test"),
});

console.log(result);
