import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function Agregar() {
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("ingreso"); // ingreso o gasto
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;


  const handleAgregar = async (e) => {
    e.preventDefault();
    setMensaje("");


    
    

    if (!monto || !descripcion) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No hay usuario logueado");

      await addDoc(collection(db, "movimientos"), {
        uid: user.uid,
        monto: parseFloat(monto),
        tipo,
        descripcion,
        fecha: Timestamp.now()
      });

      setMensaje("Movimiento guardado ✅");
      navigate("/"); // te puede llevar al dashboard o historial
    } catch (error) {
      console.error("Error al guardar:", error);
      setMensaje("Error al guardar: " + error.message);
    }
  };

  

  

  return (
    <div style={{ padding: 20 }}>
      <h2>Registrar ingreso/gasto</h2>
      <form onSubmit={handleAgregar}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select><br />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        /><br />
        <button type="submit">Agregar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Agregar;