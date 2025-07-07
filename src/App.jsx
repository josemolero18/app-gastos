import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agregar from "./pages/Agregar";
import Historial from "./pages/Historial";
import PrivateRoute from "./components/PrivateRoute";
import Registro from "./pages/Registro";
import TestGrid from "./pages/TestGrid";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/agregar"
        element={
          <PrivateRoute>
            <Agregar />
          </PrivateRoute>
        }
      />
      <Route
        path="/historial"
        element={
          <PrivateRoute>
            <Historial />
          </PrivateRoute>
        }
      />

      <Route path="/login" 
      element={
      <Login />
      } />
      <Route path="/registro"
      element={
      <Registro />
      } />
      <Route path="/testgrid"
      element={
      <TestGrid />
      } />

      {/* Redireccionar rutas desconocidas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
