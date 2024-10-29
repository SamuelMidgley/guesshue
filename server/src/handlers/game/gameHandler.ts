import { SocketType } from "../../types/server";
import { createGameHandler, joinGameHandler } from "./handlers";

export const gameHandler = (socket: SocketType) => {
  createGameHandler(socket);

  joinGameHandler(socket);
};
