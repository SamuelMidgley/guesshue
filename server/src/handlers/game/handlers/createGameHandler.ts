import { gamePlayersTable, gamesTable } from "../../../db/schema";
import { db } from "../../../server";
import { Game, GamePlayer } from "../../../types";
import { SocketType } from "../../../types/server";
import { getGameRoomName, nanoid } from "../../../utils";

export const createGameHandler = (socket: SocketType) => {
  socket.on("createGame", async () => {
    const user = socket.data;
    if (!user?.id) {
      console.log("user not signed in");
      return;
    }

    const password = nanoid();

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

    await db.insert(gamePlayersTable).values(newGamePlayer);

    socket.emit("gameCreated", newAddedGame);
    socket.emit("gameStatus", "lobby");
    socket.join(getGameRoomName(newAddedGame.id));
  });
};
