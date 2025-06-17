import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fijo arriba */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 flex items-center justify-between px-6 py-3 z-50 shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">💰 Mi Control de Gastos</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Contenido con padding superior para no quedar oculto por el header */}
      <main className="pt-20 px-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Bienvenido al Panel Principal
        </h2>
        <p className="text-gray-600">
          Desde aquí puedes agregar tus ingresos o gastos, y ver tu historial.
        </p>
      </main>
    </div>
  );
}

export default Dashboard;
