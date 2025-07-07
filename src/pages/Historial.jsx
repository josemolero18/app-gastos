import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Historial() {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "ingresos"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ingresosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIngresos(ingresosData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Historial de Ingresos</h2>
      <ul className="divide-y divide-gray-200">
        {ingresos.map((ingreso) => (
          <li key={ingreso.id} className="py-3">
            <div className="flex justify-between">
              <span className="font-medium">{ingreso.descripcion || "Ingreso sin descripción"}</span>
              <span className="text-green-600 font-bold">$ {ingreso.monto.toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-500">
              {ingreso.fecha?.toDate().toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
