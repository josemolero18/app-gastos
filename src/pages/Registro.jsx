import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!email || !clave) {
      setMensaje("Debes completar todos los campos.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, clave);
      setMensaje("Usuario registrado exitosamente ✅");
      navigate("/"); // Redirige al dashboard al registrarse
    } catch (error) {
      console.error("Error al registrar:", error);
      setMensaje("Hubo un error al registrar. Revisa si el correo ya existe.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear nueva cuenta</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        /><br />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Registro;
