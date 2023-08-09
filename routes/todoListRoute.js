const express=require("express")
const {getAllTodos,getTodo,createTodo,changeTodo,deleteTodo}=require("../controllers/todoListController")

const router=express.Router();

router.route("/getAllTodos").get(getAllTodos)

router.route("/getTodo/:id").get(getTodo)

router.route("/createTodo").post(createTodo)

router.route("/changeTodo/:id").put(changeTodo)

router.route("/deleteTodo/:id").delete(deleteTodo)


module.exports=router;