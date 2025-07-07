import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Agregar() {
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!monto || isNaN(monto)) return alert("Ingresa un monto válido");

    try {
      await addDoc(collection(db, "movimientos"), {
        tipo: "ingreso", // lo agregamos para diferenciar más adelante si quieres poner gastos también
        monto: parseFloat(monto),
        descripcion: descripcion || "",
        fecha: serverTimestamp(),
      });
      console.log(auth.currentUser) 
      setMonto("");
      setDescripcion("");
      alert("Ingreso registrado con éxito ✅");
    } catch (error) {
      console.error("Error al guardar ingreso:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-24 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Agregar Ingreso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Guardar Ingreso
        </button>
      </form>
    </div>
  );
}

export default Agregar;
