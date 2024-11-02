import { SocketType } from "../../../types";

export const isReadyHandler = (socket: SocketType) => {
  socket.on("isReady", () => {
    const user = socket.data;
    if (!user?.id) {
      console.log("user not signed in");
      return;
    }

    // check user is part of a game and that the game is not over / started

    // mark player as ready

    // emit game player updates
  });
};
