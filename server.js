const mongoose=require("mongoose")
const http=require("http")
const socketio=require("socket.io")
const express=require("express")
const cors = require("cors");
const dotenv=require("dotenv").config()
const corsOptions = {
    origin: "*",
  };
const MONGO_CONNECT_URL=process.env.MONGO_CONNECT_URL
const PORT=process.env.PORT

const app=express()
const server=http.createServer(app)
const io=socketio(server)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())
app.use(cors());

async function connect(){
    try{
        await mongoose.connect(MONGO_CONNECT_URL)
        console.log("Connected MongoDB")
    }catch(error){
        console.log(error)
    }
}
connect()

io.on('connect',(socket)=>{
    socket.on('message',(message)=>{
        io.emit('message',message)
    })
})



app.use("/api/todos",require("./routes/todoListRoute"))


app.listen(PORT,()=>{
    console.log("server running port "+PORT)
})