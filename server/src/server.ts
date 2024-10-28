import { createServer } from "./createServer";
import { gamePlayersTable, gamesTable, usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { Game, GamePlayer, User } from "./types";
const nanoid = require("nanoid");
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const db = drizzle(process.env.DB_FILE_NAME!);

const io = createServer();

io.on("connection", (socket) => {
  console.log(`New connection with socket id: ${socket.id}`);

  // Reads id from local storage and logs in if matching id found
  socket.on("attemptLogIn", async (id) => {
    try {
      if (!id) {
        console.log("Id not provided");
        return;
      }

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));

      if (!user) {
        console.log(`User with id: ${id} does not exist`);
        return;
      }

      socket.emit("loggedIn", user);
      socket.data = user;

      // Need to check if user is part of an ongoing game
    } catch (error) {
      console.error(error);
    }
  });

  // Creates a new account
  socket.on("log-in", async ({ name }: User) => {
    try {
      const newUserId = nanoid.nanoid();

      const newUser: User = {
        id: newUserId,
        name,
      };

      const [newAddedUser] = await db
        .insert(usersTable)
        .values(newUser)
        .returning();
      console.log(`New user created with id: ${newAddedUser.id}`);

      socket.emit("logged-in", newAddedUser);

      // Need to check if user is part of an ongoing game
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("create-game", async () => {
    // need to type this
    const user = socket.data;
    if (!user?.id) {
      console.log("user not signed in");
    }

    const password = nanoid.nanoid();

    const newGame: Game = {
      password: password,
    };

    const [newAddedGame] = await db
      .insert(gamesTable)
      .values(newGame)
      .returning();

    const newGamePlayer: GamePlayer = {
      gameId: newAddedGame.id,
      userId: user.id,
    };

    const result = await db.insert(gamePlayersTable).values(newGamePlayer);

    if (result.rows.length === 0) {
      console.log("something went wrong");
    }

    socket.emit("game-created", newAddedGame);

    socket.emit("game-status", "lobby");

    socket.join(`game-${newAddedGame.id}`);
  });

  // socket.on("join-lobby", (lobbyId: string) => {
  //   const currentUser = getCurrentUser(users, socket.id);

  //   if (!currentUser) {
  //     console.log(`User with id: ${socket.id} not found`);
  //     return;
  //   }

  //   const lobby = getLobbyById(lobbies, lobbyId);

  //   if (!lobby) {
  //     console.log(`Lobby with id: ${lobby} not found`);
  //     return;
  //   }

  //   lobbies = lobbies.map((lobby) => {
  //     if (lobby.id !== lobbyId) {
  //       return lobby;
  //     }

  //     return {
  //       ...lobby,
  //       users: lobby.users.concat(currentUser),
  //     };
  //   });

  //   users = updateUserActiveLobby(users, socket.id, lobby.id);

  //   socket.emit("game-status", "lobby");
  //   socket.join(lobby.id);
  //   io.to(lobby.id).emit("lobby-updated", getLobbyById(lobbies, lobbyId));
  // });

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
    // const currentUser = getCurrentUser(users, socket.id);
    // if (!currentUser) {
    //   // console.log(`User with id: ${socket.id} not found`);
    //   return;
    // }
    // users = removeUserById(users, socket.id);
    // if (currentUser.activeLobby) {
    //   lobbies = removeUserFromLobby(
    //     lobbies,
    //     currentUser.activeLobby,
    //     currentUser.id
    //   );
    // }
  });
});
