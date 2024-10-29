import { SocketType } from "../../types/server";

export const connectionHandler = (socket: SocketType) => {
  socket.on("disconnect", () => {
    console.log(`User with id ${socket.data.id} has disconnected`);
  });
};
