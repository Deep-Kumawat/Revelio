import { createServer } from 'http';
import { Server } from "socket.io";
import express, { response } from "express";
import OpenAi from 'openai';
import path from 'path';
import { fileURLToPath } from "url";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);


const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
});
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
        // we need to add this message to html page
        // socket.emit('showMessage', messageArr);
        // try {
        //     // const response = await openai.chat.completions.create({
        //     //     messages:[{
        //     //         "role": "user", "content": `Turn this message into a riddle \n ${value}`
        //     //     }],
        //     //     model: "gpt-3.5-turbo",
        //     // });
        //     const response = await openai.chat.completions.create({
        //         messages:[{
        //             "role": "user", "content": 'what is 1+89'
        //         }],
        //         model: "gpt-3.5-turbo-instruct",
        //     });
        //     socket.broadcast.emit('showMessage', response.data.choices[0].text);
        // } catch (err) {
        //     console.log(`This is the error from thingy ${err}`);        
        // }
        socket.broadcast.emit('showMessage', value);
    });
    socket.on('addTypingFeedback', ()=>{
        socket.broadcast.emit('showTypingFeedback');
    });
    socket.on('removeTypingFeedback', ()=>{
        socket.broadcast.emit('hideTypingFeedback');
    });
});
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');

})

server.listen(3000, () => {
    console.log(`listening on :${PORT}`);
});