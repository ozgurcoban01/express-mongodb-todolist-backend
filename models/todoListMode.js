const mongoose=require("mongoose")

const todoSchema=mongoose.Schema(
    {
        title:{
            type:String,
            require:true,
        },
        status:{
            type:Boolean,
            default:true,
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("todoSchema",todoSchema)