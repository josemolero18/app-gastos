import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

function Historial() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return; // Si no hay usuario, no cargar nada

    console.log("UID del usuario:", user.uid);

    const q = query(
      collection(db, "movimientos"),
      where("uid", "==", user.uid),
      orderBy("fecha", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovimientos(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error cargando movimientos:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando movimientos...</p>;

  if (movimientos.length === 0) return <p>No hay movimientos aún.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Historial de movimientos</h2>
      <ul>
        {movimientos.map(mov => (
          <li key={mov.id}>
            <strong>{mov.tipo.toUpperCase()}</strong> - {mov.descripcion}<br />
            💰 ${mov.monto.toFixed(2)} <br />
            📅 {mov.fecha.toDate().toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
