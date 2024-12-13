import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const TableProducto = ({ productos, handleEdit, handleDelete }) => {
  if (productos.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  // Función de confirmación para eliminar el producto con la estructura de alerta personalizada
  const handleDeleteConfirm = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // Llama a la función para eliminar el producto
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  return (
    <section className="lista-productos">
      <div className="table-wrapper">
        <table className="productos-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio Unitario</th>
              <th>Stock Actual</th>
              <th>Stock Mínimo</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.categoria}</td>
                <td>S/{producto.precio_unitario}</td>
                <td>{producto.stock_actual}</td>
                <td>{producto.stock_minimo}</td>
                <td>{producto.proveedor}</td>
                <td>
                  <div className="buttons-container">
                    {/* Sin alerta para editar */}
                    <button 
                      className="buttonEditar" 
                      onClick={() => handleEdit(producto)} // Llama directamente a la función de edición
                      aria-label={`Editar producto con ID ${producto.id_producto}`}
                    >
                      Editar
                    </button>
                    <button 
                      className="buttonEliminar" 
                      onClick={() => handleDeleteConfirm(producto.id_producto)} // Confirmación para eliminar
                      aria-label={`Eliminar producto con ID ${producto.id_producto}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableProducto;
