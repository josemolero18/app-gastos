import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
  deleteDoc, // Importar deleteDoc
  doc, // Importar doc
} from "firebase/firestore";

function Dashboard() {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ingresos, setIngresos] = useState([]);

  const handleLogout = async () => {
    signOut(auth);
    navigate("/login");
  };

  const handleGuardarIngreso = async (e) => {
    e.preventDefault();

    if (!monto || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
      return alert("Ingresa un monto válido mayor a 0");
    }

    try {
      await addDoc(collection(db, "movimientos"), {
        tipo: "ingreso",
        monto: parseFloat(monto),
        descripcion: descripcion || "",
        fecha: serverTimestamp(),
      });

      setMonto("");
      setDescripcion("");
      alert("Ingreso guardado ✅");
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error guardando ingreso:", error);
      alert("Error al guardar ingreso, revisa la consola.");
    }
  };

  // Nueva función para eliminar un ingreso
  const handleEliminarIngreso = async (id) => {
    // Pedir confirmación antes de eliminar
    if (window.confirm("¿Estás seguro de que quieres eliminar este ingreso?")) {
      try {
        await deleteDoc(doc(db, "movimientos", id));
        alert("Ingreso eliminado 🗑️");
      } catch (error) {
        console.error("Error eliminando ingreso:", error);
        alert("Error al eliminar ingreso, revisa la consola.");
      }
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "movimientos"),
      where("tipo", "==", "ingreso"),
      orderBy("fecha", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIngresos(data);
    });
    return () => unsubscribe();
  }, []);

  const total = ingresos.reduce((sum, ingreso) => sum + ingreso.monto, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header fijo */}
      <header className="fixed top-0 left-0 w-full h-[80px] bg-white border-b border-gray-300 flex items-center justify-between px-6 z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
          <h1 className="min-w-fit min-w-[100px] font-bold text-blue-600">
            💰 Mi Control de Gastos
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="pt-[100px] px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Bienvenido al Panel Principal
          </h2>
          <p className="text-gray-600 text-base">
            Desde aquí puedes agregar tus{" "}
            <span className="font-medium text-green-600">ingresos</span> y ver
            el total mensual.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-6">
            {/* Formulario */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg border shadow-sm md:max-w-[48%]">
              {/* Añadimos mb-6 al botón para el margen inferior */}
              <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow w-full mb-6"
              >
                {mostrarFormulario ? "Cancelar" : "Agregar Ingreso"}
              </button>

              {mostrarFormulario && (
                <form onSubmit={handleGuardarIngreso} className="space-y-4">
                  <input
                    type="number"
                    placeholder="Monto"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="text"
                    placeholder="Descripción (opcional)"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
                  >
                    Guardar Ingreso
                  </button>
                </form>
              )}
            </div>

            {/* Tabla */}
            <div className="flex-1 bg-gray-50 p-4 rounded-lg border shadow-sm md:max-w-[48%]">
              <h3 className="text-xl font-semibold mb-4">Ingresos del mes</h3>
              <div className="overflow-y-auto max-h-[400px]">
                <table className="w-full text-left text-sm table-auto">
                  <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 w-1/4">Fecha</th><th className="px-4 py-2 w-1/2">Descripción</th><th className="4px-4 py-2 w-1/4 text-right">Monto</th><th className="px-4 py-2"></th> {/* Nueva columna para el botón */}
                    </tr>
                  </thead>
                  <tbody>
                    {ingresos.length > 0 ? (
                      ingresos.map((ingreso) => (
                        <tr key={ingreso.id} className="border-t">
                          <td className="px-4 py-2 whitespace-nowrap">
                            {ingreso.fecha
                              ? ingreso.fecha.toDate().toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-4 py-2">
                            {ingreso.descripcion || "Sin descripción"}
                          </td>
                          <td className="px-4 py-2 text-green-600 font-medium text-right">
                            $ {ingreso.monto.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-center"> {/* Celda para el botón */}
                            <button
                              onClick={() => handleEliminarIngreso(ingreso.id)}
                              className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-full text-lg" // Clases para el icono de bote de basura
                              title="Eliminar ingreso"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-gray-500 py-4"> {/* colSpan ajustado a 4 */}
                          No hay ingresos registrados aún.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right text-green-700 font-bold text-lg">
                Total: $ {total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;