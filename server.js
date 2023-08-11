const dotenv=require("dotenv").config()
const PORT=process.env.PORT
const MONGO_CONNECT_URL=process.env.MONGO_CONNECT_URL
const cors = require("cors");
 
const mongoose=require("mongoose")
const express=require("express")
const app=express()
app.use(cors());
const https = require('https').Server(app);

const io = require('socket.io')(https,{
    cors:{origin:"*"}
  });


https.listen(PORT, () => console.log(`Listening on port ${PORT}`));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.use(express.json())


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




