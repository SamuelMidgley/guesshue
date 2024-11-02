import { usersTable } from "../../../db/schema";
import { db } from "../../../server";
import { User } from "../../../types";
import { SocketType } from "../../../types/server";
import { nanoid } from "../../../utils";

export const logInHandler = (socket: SocketType) => {
  socket.on("logIn", async (name) => {
    try {
      const newUserId = nanoid();

      const newUser: User = {
        id: newUserId,
        name,
      };

      const [newAddedUser] = await db
        .insert(usersTable)
        .values(newUser)
        .returning();

      console.log(`New user created with id: ${newAddedUser.id}`);

      socket.emit("loggedIn", newAddedUser);
      socket.data = newAddedUser;
    } catch (error) {
      console.error(error);
    }
  });
};
