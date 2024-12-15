import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DetalleVenta.css';

const DetalleVenta = () => {
  const { id } = useParams();
  console.log('id_venta:', id);

  const [detalleVenta, setDetalleVenta] = useState([]);
  
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/detalleventas/venta/${id}`)
        .then((response) => response.json())
        .then((data) => setDetalleVenta(data))
        .catch((error) => {
          console.error('Error al obtener los detalles de la venta:', error);
          alert('Error al obtener los detalles de la venta.');
        });
    }
  }, [id]);

  return (
    <div className="page-detalle-venta">
      <Link to="/ventasRealizadas">
        <button className="btn-volver">Volver a Ventas Realizadas</button>
      </Link>
      <h2 className="header-detalle-venta">Detalles de Venta</h2>
      {detalleVenta.length === 0 ? (
        <p className="mensaje-no-detalles">No se encontraron detalles para esta venta.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table-detalle-venta">
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {detalleVenta.map((item) => (
                <tr key={item.id_detalleventa}>
                  <td>{item.id_producto}</td>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>S/. {item.precio_unitario}</td>
                  <td>S/. {item.cantidad * item.precio_unitario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DetalleVenta;
