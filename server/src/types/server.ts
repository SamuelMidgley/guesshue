import { Socket } from "socket.io";
import { User } from "./user";
import { Game, GamePlayer, GameStatus } from "./game";

export interface ClientToServerEvents {
  attemptLogIn: (id: string) => void;
  logIn: (password: string) => void;
  createGame: () => void;
  joinGame: (password: string) => void;
  isReady: () => void;
}

export interface ServerToClientEvents {
  loggedIn: (user: User) => void;
  gameCreated: (game: Game) => void;
  gameJoined: (game: Game) => void;
  gameStatus: (gameStatus: GameStatus) => void;
  gamePlayersUpdated: (gamePlayers: GamePlayer[]) => void;
}

export interface InterServerEvents {}

export type SocketData = User;

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
