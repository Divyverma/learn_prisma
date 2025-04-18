import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoDes, setEditTodoDes] = useState("");
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodoChecked, setEditTodoChecked] = useState();

  useEffect(() => {
    const resp = axios.get("/todos").then((resp) => {
      console.log(resp.data);
      setTodos(resp.data);
    });
  }, []);


  // add a todo
  async function addTodo(e) {
    const data = {
      desc: inputTodo,
      completed: false,
    };
    const resp = await axios.post("/todos", data);
    // console.log(resp)
    if (resp.data.success) {
      setTodos((prevTodos) => [...prevTodos, resp.data.newTodo.row[0]]);
    }
    setInputTodo("")
  }


  // edit a todo
  async function editTodo(e, todo) {
    setEditMode(true)
    setEditTodoDes(todo.todo_desc)
    setEditTodoChecked(todo.todo_completed)
    setEditTodoId(todo.todo_id)
  }

  async function updateTodo(e){
    const data = {
      desc: editTodoDes,
      completed: editTodoChecked
    }
    const resp = await axios.put(`/todos/${editTodoId}`, data)
    setEditMode(true)
  }


  // delete a particular todo
  async function deleteTodo(e, todo) {
    const resp = await axios.delete(`/todos/${todo.todo_id}`)
    if(resp.data.success){
      setTodos(prevTodos => prevTodos.filter((t) => t.todo_id != todo.todo_id))
    }
  }


  // delete all todo
  async function clearAllTodo(e) {
    const resp = await axios.delete("/todos")
    setTodos([])
  }


  if(editMode){
    return (
      <div>
        
        <form clasName="form"
          onSubmit={updateTodo}
        >
          <div>edit Todo</div>

          <div>
            <input 
            type="text" 
            placeholder="Enter Todo" 
            value={editTodoDes} 
            onChange={(e)=> setEditTodoDes(e.target.value)} />

            <div>
              <label>Completed:</label>
              <input type="checkbox" 
              checked={editTodoChecked} 
              onChange={(e)=>setEditTodoChecked(e.target.checked)}
              />
            </div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="App">
      <div>Todo List Psql</div>
      <div className="input-div">
        <input
          type="text"
          placeholder="Enter Todo"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>
        <button onClick={clearAllTodo}>Clear All</button>
      </div>

      <div className="todo">
        {todos.map((todo, index) => {
          return (
            <div key={index}>
              <div clasName="tinput">
                <input type="checkbox" checked={todo.todo_completed} />
                <div>{todo.todo_desc}</div>
              </div>
              <div>
                <button onClick={(e) => editTodo(e, todo)}>Edit</button>
                <button onClick={(e) => deleteTodo(e, todo)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
