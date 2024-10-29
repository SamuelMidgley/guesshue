import { eq } from "drizzle-orm";

import { gamePlayersTable, gamesTable, usersTable } from "../../../db/schema";
import { db, io } from "../../../server";
import { GamePlayer } from "../../../types";
import { getGameRoomName } from "../../../utils";
import { SocketType } from "../../../types/server";

export const joinGameHandler = (socket: SocketType) => {
  socket.on("joinGame", async (password: string) => {
    const user = socket.data;
    if (!user?.id) {
      console.log("user not signed in");
      return;
    }

    const [game] = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.password, password));

    if (!game) {
      // Need to check if we ever hit this?
      console.log("Game not found");
      socket.emit("gameStatus", "not-found");
      return;
    }

    const newGamePlayer: GamePlayer = {
      gameId: game.id,
      userId: user.id,
    };

    await db.insert(gamePlayersTable).values(newGamePlayer);

    socket.emit("gameJoined", game);
    socket.emit("gameStatus", "lobby");
    socket.join(getGameRoomName(game.id));

    const players = await db
      .select({
        id: gamePlayersTable.id,
        gameId: gamePlayersTable.gameId,
        userId: gamePlayersTable.userId,
        name: usersTable.name,
        isReady: gamePlayersTable.isReady,
      })
      .from(gamePlayersTable)
      .innerJoin(usersTable, eq(usersTable.id, gamePlayersTable.userId))
      .where(eq(gamePlayersTable.gameId, game.id));

    console.log(players);

    io.to(getGameRoomName(game.id)).emit("gamePlayersUpdated", players);
  });
};
