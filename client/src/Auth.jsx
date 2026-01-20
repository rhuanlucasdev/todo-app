import { useState } from "react";
import api from "./api";

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const { data } = await api.post(endpoint, payload);
      if (isLogin) {
        localStorage.setItem("token", data.token); //salva o "cracha" no navegador
        setToken(data.token); //avisando o app que estamos logados
      } else {
        alert("Cadastro feito! Agora faca login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Erro na operacao");
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "Login" : "Cadastro"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursos: "pointer", color: "blue" }}
      >
        {isLogin ? "Nao tem conta? Cadastre-se" : "Ja tem conta? Login"}
      </p>
    </div>
  );
}
