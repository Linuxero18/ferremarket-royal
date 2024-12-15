import { useState, useEffect } from 'react';
import './RegistrarVenta.css';

const RegistrarVenta = () => {
  const [fechaVenta, setFechaVenta] = useState(new Date().toISOString().split('T')[0]);
  const [productos, setProductos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const id_usuario = localStorage.getItem('userId');

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  // Función para calcular el total de la venta
  const calcularTotalVenta = () => {
    const total = detalles.reduce(
      (acc, detalle) => acc + detalle.cantidad * parseFloat(detalle.precio_unitario),
      0
    );
    setTotalVenta(total);
  };

  useEffect(() => {
    calcularTotalVenta();
  }, [detalles]);

  const agregarDetalle = (id_producto, precio_unitario, nombre_producto) => {
    const nuevoDetalle = {
      id_producto,
      cantidad: 1,
      precio_unitario,
      nombre_producto,
    };
    setDetalles([...detalles, nuevoDetalle]);
  };

  const quitarDetalle = (index) => {
    const nuevosDetalles = detalles.filter((_, idx) => idx !== index);
    setDetalles(nuevosDetalles);
  };

  const actualizarDetalle = (index, key, value) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index][key] = value;
    setDetalles(nuevosDetalles);
  };

  const registrarVenta = async () => {
    const venta = {
      fecha_venta: fechaVenta,
      total_venta: totalVenta, // El total actualizado
      id_usuario: id_usuario,
      detalles: detalles.map((detalle) => ({
        id_venta: null,  // Aún no tiene id_venta, lo asignaremos más tarde
        id_producto: detalle.id_producto,
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
      })),
    };

    try {
      // Registrar la venta principal en el servidor
      const responseVenta = await fetch('http://localhost:3000/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venta),
      });

      const dataVenta = await responseVenta.json();
      console.log('dataVenta:', dataVenta);

      if (responseVenta.ok) {
        // Obtener el id_venta de la respuesta del servidor
        const id_venta = dataVenta.id;
        console.log('id_venta:', id_venta);

        // Actualizar los detalles con el id_venta recibido
        const detallesConIdVenta = detalles.map((detalle) => ({
          ...detalle,  // Copiar todos los detalles
          id_venta,    // Asignar el id_venta a cada detalle
        }));

        // Registrar los detalles de la venta
        for (const detalle of detallesConIdVenta) {
          const responseDetalle = await fetch('http://localhost:3000/detalleventas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_venta: id_venta,
              id_producto: detalle.id_producto,
              cantidad: detalle.cantidad,
              precio_unitario: detalle.precio_unitario,
            }),
          });

          if (!responseDetalle.ok) {
            alert('Error al registrar el detalle de la venta');
            return;
          }
        }

        alert('Venta registrada con éxito');
      } else {
        alert('Error al registrar la venta');
        console.error(dataVenta.error);
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="page-registrar-venta">
      <h2>Registrar Venta</h2>
      <form className="form-venta">
        <div>
          <label>Fecha de la venta:</label>
          <input
            type="date"
            value={fechaVenta}
            onChange={(e) => setFechaVenta(e.target.value)}
          />
        </div>
        <div>
          <h3>Seleccionar productos</h3>
          <select
            onChange={(e) => {
              const productoSeleccionado = productos.find(
                (producto) => producto.id_producto === parseInt(e.target.value)
              );
              if (productoSeleccionado) {
                agregarDetalle(
                  productoSeleccionado.id_producto,
                  productoSeleccionado.precio_unitario,
                  productoSeleccionado.nombre
                );
              }
            }}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id_producto} value={producto.id_producto}>
                {producto.nombre} - ${producto.precio_unitario}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Detalles de la Venta</h3>
          <table className="detalles-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={index}>
                  <td>{detalle.nombre_producto}</td>
                  <td>
                    <input
                      type="number"
                      value={detalle.cantidad}
                      min="1"
                      onChange={(e) =>
                        actualizarDetalle(index, 'cantidad', parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${detalle.precio_unitario}</td>
                  <td>${(detalle.cantidad * parseFloat(detalle.precio_unitario)).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="button-eliminar"
                      onClick={() => quitarDetalle(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Total Venta: ${totalVenta.toFixed(2)}</h3>
        </div>
        <button type="button" className="btn-registrar-venta" onClick={registrarVenta}>
          Registrar Venta
        </button>
      </form>
    </div>
  );
};

export default RegistrarVenta;
