const express=require("express")
const todoSchema=require("../models/todoListMode")

const getAllTodos=async (req,res)=>{
    const allTodos=await todoSchema.find()
    res.json(allTodos)
}

const getTodo=async (req,res)=>{
    const todo=await todoSchema.findById(req.params.id);
    res.json(todo);
}

const createTodo=async (req,res)=>{
    const{title}=req.body
    const createdTodo=await todoSchema.create({
        title
    })
    res.json(createdTodo)
}

const changeTodo=async (req,res)=>{

    const updatedTodo=await todoSchema.findByIdAndUpdate(
        req.params.id,
        req.body
    )
    res.json(updatedTodo)
}

const deleteTodo=async (req,res)=>{
    const todo=await todoSchema.findByIdAndDelete({_id:req.params.id});

    res.json(todo)
}



module.exports={getAllTodos,getTodo,createTodo,changeTodo,deleteTodo};