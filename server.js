import { Server } from "socket.io";
import express from "express";
import { createServer } from 'http';

const PORT = 3000;
const app = express();
const server = createServer(app);
const socket = new Server();
const io = new Server(server);
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected and the below thingy is the socketid');
    console.log(socket.id);
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
    socket.on('message', (value)=>{
        console.log(`recieved this message: ${value}`);
    });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(3000, () => {
    console.log(`listening on :${PORT}`);
});