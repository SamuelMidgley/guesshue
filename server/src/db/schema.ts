import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
});

export const gamesTable = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  password: text().notNull(),
  winner: text().references(() => usersTable.id),
});

export const gamePlayersTable = sqliteTable("game_players", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => usersTable.id),
  gameId: int("game_id").references(() => gamesTable.id),
  isReady: int("is_ready", { mode: "boolean" }).default(false),
});

export const gameGuessesTable = sqliteTable("game_guesses_table", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => usersTable.id),
  gameId: int("game_id").references(() => gamesTable.id),
  round: int().notNull(),
  isCorrect: int("is_correct", { mode: "boolean" }),
});
