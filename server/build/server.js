import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
let lobby = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3500;
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
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
        ],
    },
});
io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);
    socket.emit("lobby", lobby);
    socket.on("log-in", ({ id, name }) => {
        console.log(id, name);
        lobby.push({
            id,
            name,
        });
        io.emit("lobby", lobby);
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
