import React from 'react';

const TableProducto = ({ productos, handleEdit, handleDelete }) => {
  return (
    <section className="lista-productos">
      <h2>Lista de Productos</h2>
      <table className="productos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio Unitario</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio_unitario}</td>
              <td>{producto.stock_actual}</td>
              <td>{producto.stock_minimo}</td>
              <td>
                <div className="buttons-container">
                  <button className="buttonEditar" onClick={() => handleEdit(producto)}>Editar</button>
                  <button className="buttonEliminar" onClick={() => handleDelete(producto.id_producto)}>Eliminar</button>
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