import { gamePlayersTable, gamesTable } from "../db/schema";

// todo :  make these actual types not inferred from db
export type Game = typeof gamesTable.$inferInsert;

export type GamePlayer = typeof gamePlayersTable.$inferInsert;

export type GameStatus = "home" | "lobby" | "game" | "results" | "not-found";
