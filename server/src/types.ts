export interface User {
  id: string;
  name: string;
  activeLobby?: string;
}

export type GameStatus = "home" | "lobby" | "game" | "results";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Vote {
  id: string;
  name: string;
  isCorrect: boolean;
}

export interface Game {
  colorOptions: string[];
  correctColor: string;
  votes: Vote[];
}

export interface Lobby {
  id: string;
  users: User[];
  games: Game[];
}
