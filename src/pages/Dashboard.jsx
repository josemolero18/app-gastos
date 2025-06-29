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
    <div className="min-h-screen bg-gray-100 ">
      {/* Header fijo */}
      <header className="fixed top-0 left-0 w-full h-[80px] bg-white border-b border-gray-300 flex items-center justify-between px-6 z-50 shadow-sm">
        {/* Adjusted this div to add spacing */}
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full"> {/* Added w-full here */}
          <h1 className="text-2xl font-bold text-blue-600">💰 Mi Control de Gastos</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="pt-[100px] px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Bienvenido al Panel Principal
          </h2>
          <p className="text-gray-600 text-base">
            Desde aquí puedes agregar tus <span className="font-medium text-green-600">ingresos</span> o <span className="font-medium text-red-600">gastos</span>, y ver tu historial detallado.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow w-full sm:w-auto">
              Agregar Ingreso
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow w-full sm:w-auto">
              Agregar Gasto
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;