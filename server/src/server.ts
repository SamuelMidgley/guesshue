import { createServer } from "./createServer";
import {
  getCurrentUser,
  getLobbyById,
  removeUserById,
  removeUserFromLobby,
  updateUserActiveLobby,
} from "./helper";
import { Lobby, User } from "./types";
const nanoid = require("nanoid");

let users: User[] = [];
let lobbies: Lobby[] = [];

const io = createServer();

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("log-in", ({ id, name }: User) => {
    const newUser: User = {
      id,
      name,
    };

    users = users.concat(newUser);

    socket.emit("logged-in", newUser);
  });

  socket.on("create-lobby", () => {
    const currentUser = getCurrentUser(users, socket.id);

    if (!currentUser) {
      console.log(`User with id: ${socket.id} not found`);
      return;
    }

    const newLobbyId = nanoid.nanoid();

    const newLobby: Lobby = {
      id: newLobbyId,
      users: [currentUser],
      games: [],
    };

    lobbies = lobbies.concat(newLobby);

    users = updateUserActiveLobby(users, socket.id, newLobbyId);

    socket.emit("game-status", "lobby");
    socket.emit("lobby-created", newLobby);
    socket.join(newLobbyId);
  });

  socket.on("join-lobby", (lobbyId: string) => {
    const currentUser = getCurrentUser(users, socket.id);

    if (!currentUser) {
      console.log(`User with id: ${socket.id} not found`);
      return;
    }

    const lobby = getLobbyById(lobbies, lobbyId);

    if (!lobby) {
      console.log(`Lobby with id: ${lobby} not found`);
      return;
    }

    lobbies = lobbies.map((lobby) => {
      if (lobby.id !== lobbyId) {
        return lobby;
      }

      return {
        ...lobby,
        users: lobby.users.concat(currentUser),
      };
    });

    users = updateUserActiveLobby(users, socket.id, lobby.id);

    socket.emit("game-status", "lobby");
    socket.join(lobby.id);
    io.to(lobby.id).emit("lobby-updated", getLobbyById(lobbies, lobbyId));
  });

  // socket.on("is-ready", () => {
  //   lobby = lobby.map((user) => {
  //     if (user.id === socket.id) {
  //       return {
  //         ...user,
  //         isReady: true,
  //       };
  //     }

  //     return user;
  //   });

  //   io.emit("lobby", lobby);

  //   if (lobby.length > 1 && lobby.every((user) => user.isReady)) {
  //     io.emit("game-status", "game");

  //     io.emit("new-game", game);
  //   }
  // });

  // socket.on("voted", (vote: Vote) => {
  //   console.log("user voted ", vote);

  //   game.votes = game.votes.concat(vote);

  //   console.log(game.votes);

  //   io.emit("game-update", game);
  // });

  socket.on("disconnect", () => {
    const currentUser = getCurrentUser(users, socket.id);

    if (!currentUser) {
      console.log(`User with id: ${socket.id} not found`);
      return;
    }

    users = removeUserById(users, socket.id);

    if (currentUser.activeLobby) {
      lobbies = removeUserFromLobby(
        lobbies,
        currentUser.activeLobby,
        currentUser.id
      );
    }
  });
});
