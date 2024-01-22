import { Server } from "socket.io";
import express from "express";
import { createServer } from 'node:http';

const PORT = 3000;
const app = express();
const server = createServer(app);
const socket = new Server();
const io = new Server(server);
const __dirname = '/home/deep/Deep/Personal Side Projects/Revelio/frontend/revelio/';


io.on('connection', (socket) => {
    console.log('a user connected and the below thingy is the socketid');
    console.log(socket.id);
    socket.on('disconnect', () => {
        console.log(`${socket.id} dissconnected`);
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(3000, () => {
    console.log('listening on :3000');
});

// app.listen(PORT);