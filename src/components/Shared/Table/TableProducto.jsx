const TableProducto = ({ productos, handleEdit, handleDelete }) => {
  if (productos.length === 0) {
    return <p>No hay productos disponibles</p>;
  }

  const handleDeleteConfirm = (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de eliminar este producto?");
    if (isConfirmed) {
      handleDelete(id);
    }
  };

  return (
    <section className="lista-productos">
      <h2>Lista de Productos</h2>
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
              <td>${producto.precio_unitario}</td>
              <td>{producto.stock_actual}</td>
              <td>{producto.stock_minimo}</td>
              <td>{producto.proveedor}</td>
              <td>
                <div className="buttons-container">
                  <button 
                    className="buttonEditar" 
                    onClick={() => handleEdit(producto)} 
                    aria-label={`Editar producto con ID ${producto.id_producto}`}
                  >
                    Editar
                  </button>
                  <button 
                    className="buttonEliminar" 
                    onClick={() => handleDeleteConfirm(producto.id_producto)}
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
    </section>
  );
};

export default TableProducto;
