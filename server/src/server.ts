import express from "express";
import { Server } from "socket.io";
import { User } from "./types";

let lobby: User[] = [];

const PORT = Number(process.env.PORT) || 3500;

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

const io = new Server(expressServer, {
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

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit("lobby", lobby);

  socket.on("log-in", ({ id, name }: User) => {
    const newUser = {
      id,
      name,
      isReady: false,
    };

    console.log(id, name);
    lobby = lobby.concat(newUser);

    socket.emit("logged-in", newUser);
    socket.emit("game-status", "lobby");
    io.emit("lobby", lobby);
  });

  socket.on("is-ready", () => {
    lobby = lobby.map((user) => {
      if (user.id === socket.id) {
        return {
          ...user,
          isReady: true,
        };
      }

      return user;
    });

    io.emit("lobby", lobby);

    if (lobby.length > 1 && lobby.every((user) => user.isReady)) {
      io.emit("game-status", "game");
    }
  });

  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });

  socket.on("disconnect", () => {
    lobby = lobby.filter((user) => user.id !== socket.id);

    io.emit("lobby", lobby);
  });
});
