import express from "express";
import { Server } from "socket.io";

const PORT = Number(process.env.PORT) || 3500;

export const createServer = () => {
  const app = express();

  const expressServer = app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });

  return new Server(expressServer, {
    cors: {
      origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:4173/",
        "http://127.0.0.1:4173/",
        "http://localhost:5173/",
        "http://127.0.0.1:5173/",
        "https://guesshue.midgley.dev",
      ],
    },
  });
};
