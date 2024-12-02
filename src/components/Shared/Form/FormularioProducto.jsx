import React, { useState, useEffect } from 'react';

const FormularioProducto = ({ productoEdit, setProductoEdit, fetchProductos }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    id_producto: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio_unitario: '',
    stock_actual: '',
    stock_minimo: '',
    id_proveedor: '',
    ultima_modificacion: ''
  });

  useEffect(() => {
    if (productoEdit) {
      setNuevoProducto({ ...productoEdit });
    } else {
      setNuevoProducto({
        id_producto: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        precio_unitario: '',
        stock_actual: '',
        stock_minimo: '',
        id_proveedor: '',
        ultima_modificacion: ''
      });
    }
  }, [productoEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    try {
      const url = productoEdit ? `http://localhost:3000/productos/${productoEdit.id_producto}` : 'http://localhost:3000/productos/';
      const method = productoEdit ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        alert(productoEdit ? 'Producto editado' : 'Producto agregado');
        setProductoEdit(null);
        fetchProductos();
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <section className="productos-formulario">
      <h2>{productoEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit = {handleSubmitProducto}>
        <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleInputChange} placeholder="Nombre" required />
        <input type="text" name="descripcion" value={nuevoProducto.descripcion} onChange={handleInputChange} placeholder="Descripción" required />
        <input type="text" name="categoria" value={nuevoProducto.categoria} onChange={handleInputChange} placeholder="Categoría" required />
        <input type="number" name="precio_unitario" value={nuevoProducto.precio_unitario} onChange={handleInputChange} placeholder="Precio Unitario" required />
        <input type="number" name="stock_actual" value={nuevoProducto.stock_actual} onChange={handleInputChange} placeholder="Stock Actual" required />
        <input type="number" name="stock_minimo" value={nuevoProducto.stock_minimo} onChange={handleInputChange} placeholder="Stock Mínimo" required />
        <input type="text" name="id_proveedor" value={nuevoProducto.id_proveedor} onChange={handleInputChange} placeholder="ID Proveedor" required />
        <button type="submit">{productoEdit ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </section>
  );
};

export default FormularioProducto;