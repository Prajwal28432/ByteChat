const express =require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const chatRoutes  = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const {notFound,errorHandler} =require('./middleware/errorMiddleware')
const app = express();
const chats = require('./data/data');
const connectDB = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 5000
 connectDB();
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("welcome");
})
// app.get('/api/chat/',(req,res)=>{
//     res.send("Hello");
// })
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use(notFound);
app.use(errorHandler);


const server =app.listen(5000,console.log("app is listening on port 5000"));
const io= require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection",(socket)=>{
console.log("connected to socket.io");

socket.on('setup',(userData)=>{
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected")
});

socket.on('join chat',(room)=>{
    socket.join(room);
    console.log("user joined room"+room);
})

socket.on('typing',(room)=>socket.in(room).emit("typing"));
socket.on("stop typing ",(room)=>socket.in(room).emit("stop typing"));
socket.on("new message",(newMessageReceived)=>{
    var chat = newMessageReceived.chat;
    if(!chat.users) return console.log('chat.users not defined');

    chat.users.forEach(user=>{
        if(user._id==newMessageReceived.sender._id) return;

        socket.in(user._id).emit("message received",newMessageReceived);
    })
})

socket.off("setup",()=>{
    console.log("User disconnectef");
    socket.leave(userData._id);
})
});