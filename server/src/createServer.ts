import express from "express";
import { Server } from "socket.io";

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/server";

const PORT = Number(process.env.PORT) || 5500;

export const createServer = () => {
  const app = express();

  const expressServer = app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });

  return new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(expressServer, {
    cors: {
      origin: "*",
    },
  });
};
