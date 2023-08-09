const mongoose=require("mongoose")
const express=require("express")
const cors = require("cors");
const dotenv=require("dotenv").config()
const corsOptions = {
    origin: "http://127.0.0.1:5500/",
  };
const MONGO_CONNECT_URL=process.env.MONGO_CONNECT_URL
const PORT=process.env.PORT

const app=express()

app.use(express.json())
app.use(cors(corsOptions));
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



app.listen(PORT,()=>{
    console.log("server running port "+PORT)
})