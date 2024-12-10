import React, { useState, useEffect } from 'react';

const FormularioProducto = ({ productoEdit, setProductoEdit, fetchProductos }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    id_producto: '',
    nombre: '',
    descripcion: '',
    id_categoria: '',
    precio_unitario: '',
    stock_actual: '',
    stock_minimo: '',
    id_proveedor: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categoriaRes = await fetch('http://localhost:3000/categorias');
        const proveedorRes = await fetch('http://localhost:3000/proveedores');
        const categoriasData = await categoriaRes.json();
        const proveedoresData = await proveedorRes.json();

        setCategorias(categoriasData);
        setProveedores(proveedoresData);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar categorías o proveedores');
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (productoEdit) {
      setNuevoProducto({
        ...productoEdit,
      });
    } else {
      setNuevoProducto({
        id_producto: '',
        nombre: '',
        descripcion: '',
        id_categoria: '',
        precio_unitario: '',
        stock_actual: '',
        stock_minimo: '',
        id_proveedor: '',
      });
    }
  }, [productoEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();

    if (!nuevoProducto.nombre || !nuevoProducto.precio_unitario || !nuevoProducto.stock_actual) {
      setError('Todos los campos requeridos deben ser completados');
      return;
    }

    if (!nuevoProducto.id_categoria || !nuevoProducto.id_proveedor) {
      setError('Debe seleccionar una categoría y un proveedor');
      return;
    }

    try {
      const url = productoEdit
        ? `http://localhost:3000/productos/${productoEdit.id_producto}`
        : 'http://localhost:3000/productos/';
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
        setError(null);
      } else {
        setError('Error al guardar el producto');
      }
    } catch (error) {
      setError('Error al guardar el producto');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="productos-formulario">
      <h2>{productoEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmitProducto}>
        <input
          type="text"
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="descripcion"
          value={nuevoProducto.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción"
          required
        />
        <select
          name="id_categoria"
          value={nuevoProducto.id_categoria}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre_categoria}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="precio_unitario"
          value={nuevoProducto.precio_unitario}
          onChange={handleInputChange}
          placeholder="Precio Unitario"
          required
        />
        <input
          type="number"
          name="stock_actual"
          value={nuevoProducto.stock_actual}
          onChange={handleInputChange}
          placeholder="Stock Actual"
          required
        />
        <input
          type="number"
          name="stock_minimo"
          value={nuevoProducto.stock_minimo}
          onChange={handleInputChange}
          placeholder="Stock Mínimo"
          required
        />
        <select
          name="id_proveedor"
          value={nuevoProducto.id_proveedor}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar Proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
              {proveedor.nombre_proveedor}
            </option>
          ))}
        </select>
        <button type="submit">{productoEdit ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </section>
  );
};

export default FormularioProducto;
