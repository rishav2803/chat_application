const express = require('express');
const app = express();
const http = require('http');
// Server Class 
const { Server } = require('socket.io')
const cors = require('cors')
const db = require('./config/database')
const messageRouter = require('./routes/MessagesRoutes');
const userRouter = require('./routes/UserRoutes');
var users = [];
app.use(cors())
app.use(express.json());

const server = http.createServer(app)


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Database connected")
})

app.use('/', messageRouter);
app.use('/user', userRouter);


// io is the new Server object
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})


io.on('connection', socket => {
    socket.on('user_connected', userName => {
        users.push({
            userName: userName,
            id: socket.id,
            status: true
        })
        console.log(users);
        socket.emit('users_connected', users);
        socket.emit('users_connected', users);
        socket.broadcast.emit('users_connected', users);
    })


    socket.on('send-message', data => {
        console.log(data.sender)
        // Broadcast emit will emit to all the users expect the one who sent the message
        const [receiver] = users.filter(user => user.userName === data.receiver);
        if(receiver!==undefined){
            socket.to(receiver.id).emit('recived-message', data)
        }
    })

    socket.on('disconnect', reason => {
        const id = socket.id;
        // users.forEach(user => {
        //     if (user.id == id) {
        //         user.status = false
        //     }
        // })
        users = users.filter(user => user.id !== id);
        socket.broadcast.emit('users_connected', users);
        console.log(users)
    })
})

server.listen(4000, () => {
    console.log("Serve up on localhost:4000");
})
