import { SocketType } from "../../types/server";
import { attemptLogInHandler, logInHandler } from "./handlers/";

export const authHandler = (socket: SocketType) => {
  // Client reads id from local storage and logs in if matching id found
  attemptLogInHandler(socket);

  // Creates a new account
  logInHandler(socket);
};
