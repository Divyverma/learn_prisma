const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());


// home page
app.get("/", (req, res) => {
  res.json({ msg: "Todos Home Page" });
});


// add a todo
app.post("/todos", async (req, res) => {
  try {
    const { desc, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo_table (todo_desc, todo_completed) VALUES($1, $2) RETURNING *",
      [desc, completed]
    );
    res.json({newTodo});
  } catch (error) {
    res.json({ error });
  }
});


// get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo_table");
    res.json(todos.rows);
  } catch (error) {
    res.json({ error });
  }
});


// get a particular todo
app.get("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo_table WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows)
    } catch (error) {
        res.json(error);
    }
} )


// update a particular todo
app.put("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const {desc, completed} = req.body
        const todo =  await pool.query(
            "UPDATE todo_table SET todo_desc = $1, todo_completed = $2 WHERE todo_id = $3", [desc, completed, id])
        res.json({msg:"updated", success:true})
    } catch (error) {
        res.json(error);
    }
})


// delete particular todo
app.delete("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params
        await pool.query(
            "DELETE FROM todo_table WHERE todo_id = $1",
            [id]
        )
        res.json({msg:"deleted", success:true})
    } catch (error) {
        res.json(error);
    }
})


// delet all
app.delete("/todos", async (req, res) =>{
    try {
        await pool.query(
            "DELETE FROM todo_table"
        )
        res.json({msg:"All deleted", success:true})
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => {
  console.log(`App is Running on PORT ${PORT}`);
});
