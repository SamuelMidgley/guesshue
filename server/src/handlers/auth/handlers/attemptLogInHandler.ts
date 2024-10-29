import { eq } from "drizzle-orm";

import { usersTable } from "../../../db/schema";
import { db } from "../../../server";
import { SocketType } from "../../../types/server";

export const attemptLogInHandler = (socket: SocketType) => {
  socket.on("attemptLogIn", async (id) => {
    try {
      if (!id) {
        console.log("Id not provided");
        return;
      }

      console.log(id);

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
};
