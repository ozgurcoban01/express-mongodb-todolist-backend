const dotenv=require("dotenv").config()
const PORT=process.env.PORT
const MONGO_CONNECT_URL=process.env.MONGO_CONNECT_URL

const mongoose=require("mongoose")
const express=require("express")
const app=express()
const http = require('http').Server(app);

const io = require('socket.io')(http,{
    cors:{origin:"*"}
  });


http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const cors = require("cors");
 


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


app.use("/api/todos",require("./routes/todoListRoute"))


io.on('connection',(socket)=>{
    console.log('a user connected '+ socket.id)

    socket.on('message',(message)=>{

        io.emit('message',`${message}`)
    })

})




