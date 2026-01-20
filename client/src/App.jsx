import { useState } from "react";
import Auth from "./Auth";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Se não tem token, mostra Auth. Se tem, mostra a lista.
  return (
    <div
      className="container"
      style={{ background: "white", minHeight: "100vh", padding: "20px" }}
    >
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <>
          <button
            onClick={handleLogout}
            style={{ float: "right", background: "red", color: "white" }}
          >
            Sair
          </button>
          <h1>Minhas Tarefas</h1>
          <TodoList />
        </>
      )}
    </div>
  );
}

export default App;
