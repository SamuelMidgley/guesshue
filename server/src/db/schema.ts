import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
  dateCreated: text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const gamesTable = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  dateTimeCreated: text().default(sql`(CURRENT_TIMESTAMP)`),
  dateTimeStarted: text().default(sql`(CURRENT_TIMESTAMP)`),
  password: text().notNull(),
  winner: text().references(() => usersTable.id),
  dateTimeCompleted: text(),
});

export const gamePlayersTable = sqliteTable("game_players", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  gameId: int("game_id")
    .notNull()
    .references(() => gamesTable.id),
  isReady: int("is_ready", { mode: "boolean" }).notNull().default(false),
});

export const gameGuessesTable = sqliteTable("game_guesses_table", {
  id: int().primaryKey({ autoIncrement: true }),
  dateTimeCreated: text().default(sql`(CURRENT_TIMESTAMP)`),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  gameId: int("game_id")
    .notNull()
    .references(() => gamesTable.id),
  round: int().notNull(),
  isCorrect: int("is_correct", { mode: "boolean" }),
});
