import { useEffect, useState } from 'react';

const TableVentas = () => {
  const [ventas, setVentas] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Formato: YYYY-MM-DD HH:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    // Obtener las ventas desde el backend
    fetch('http://localhost:3000/ventas')
      .then(response => response.json())
      .then(data => setVentas(data))
      .catch(error => {
        console.error('Error fetching sales:', error);
      });
  }, []);

  return (
    <div className="ventas-list">
      <h2>Ventas Realizadas</h2>
      <table>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{formatDate(venta.fecha_venta)}</td>
              <td>{venta.total_venta}</td>
              <td>{venta.nombre_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVentas;
