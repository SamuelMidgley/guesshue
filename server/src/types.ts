export interface User {
  id: string;
  name: string;
  isReady: boolean;
}

export type GameStatus = "home" | "lobby" | "game" | "results";
