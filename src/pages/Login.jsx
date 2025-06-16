import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/dashboard");
    } catch (e) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      <input placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Entrar</button>
    </div>
  );
}

export default Login;
