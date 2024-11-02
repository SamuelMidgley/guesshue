import { drizzle } from "drizzle-orm/libsql";
import "dotenv/config";

import { createServer } from "./createServer";
import { authHandler } from "./handlers/auth";
import { gameHandler } from "./handlers/game";
import { connectionHandler } from "./handlers/connection";

export const db = drizzle(process.env.DB_FILE_NAME!);

export const io = createServer();

io.on("connection", (socket) => {
  console.log("New connection established");

  connectionHandler(socket);

  authHandler(socket);

  gameHandler(socket);
});
