import React from 'react';

const CardProducto = ({ producto, handleEdit, handleDelete }) => {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio_unitario}</p>
      <p>Stock: {producto.stock_actual}</p>
      <button onClick={() => handleEdit(producto)}>Editar</button>
      <button onClick={() => handleDelete(producto.id_producto)}>Eliminar</button>
    </div>
  );
};

export default CardProducto;