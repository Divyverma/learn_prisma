const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const { createTodo, getTodos, getTodo, updateTodo, deleteTodo, deleteAllTodo } = require('./controllers/todos')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res)=>{
    res.json({msg: "Todo list in prisma"})
})

app.post("/todos", async (req, res)=>{
    try {
        const {desc} = req.body
        const newTodo = await createTodo(desc)
        res.json({msg: "Todo Created", success:true, newTodo})
    } catch (error) {
        res.json(error.message)
    }
})

app.get("/todos", async (req, res)=>{
    try {
       const todos = await getTodos();
       res.json(todos)
    } catch (error) {
        res.json(error.message)
    }
})

app.get("/todos/:id", async (req, res)=>{
    try {
       const {id} = req.params;
       const todo = await getTodo(Number(id));
       res.json(todo)
       console.log(todo)
    } catch (error) {
        res.json(error.message)
    }
})


app.put("/todos/:id", async (req, res)=>{
    try {
       const {id} = req.params;
       const {desc, completed} = req.body
       await updateTodo(Number(id), desc, completed)
       res.json({msg:"Todo updated", success:true})
    } catch (error) {
        res.json(error.message)
    }
})

app.delete("/todos/:id", async (req, res)=>{
    try {
       const {id} = req.params
       await deleteTodo(Number(id))
       res.json({msg:"Todo Deleted", success:true})
    } catch (error) {
        res.json(error.message)
    }
})

app.delete("/todos", async (req, res)=>{
    try {
       await deleteAllTodo()
       res.json({msg: "All todo Deleted", success:true})
    } catch (error) {
        res.json(error.message)
    }
})


app.listen(PORT, ()=>{
    console.log(`App is runnin on port ${PORT}`)
})