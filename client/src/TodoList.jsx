import { useState, useEffect } from "react";
import api from "./api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //busca as tarefas ao carregar a pagina
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await api.get("/todos");
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const { data } = await api.post("./todos", { title: newTodo });
    setTodos([...todos, data]);
    setNewTodo("");
  };

  const toggleTodo = async (todo) => {
    await api.put(`/todos/${todo.id}`, {
      title: todo.title,
      completed: todo.completed ? 0 : 1,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo} style={{ display: "flex", gap: "5px" }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => toggleTodo(todo)}
              style={{ cursor: "pointer" }}
            >
              {todo.title}
            </span>
            <buton onClick={() => deleteTodo(todo.id)}>X</buton>
          </div>
        ))}
      </div>
    </div>
  );
}
