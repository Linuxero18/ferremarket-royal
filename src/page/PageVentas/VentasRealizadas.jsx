import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VentasRealizadas.css'; // Asegúrate de importar el archivo CSS

const VentasRealizadas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/ventas')
      .then((response) => response.json())
      .then((data) => setVentas(data))
      .catch((error) => console.error('Error al obtener las ventas:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="page-ventas">
      <Link to="/ventas">
        <button>Volver</button>
      </Link>
      <div>
        <h2>Ventas Realizadas</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.id_venta}</td>
                  <td>{formatDate(venta.fecha_venta)}</td>
                  <td>S/.{venta.total_venta}</td>
                  <td>{venta.nombre_usuario}</td>
                  <td>
                  <Link to={`/detalleventas/venta/${venta.id_venta}`}>
                    <button>Ver Detalles</button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VentasRealizadas;
