import React, { useState, useEffect } from 'react';

const FormularioProducto = ({ productoEdit, setProductoEdit, fetchProductos }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    id_producto: '',
    nombre: '',
    descripcion: '',
    categoria: '',  // Este es el ID de la categoría
    precio_unitario: '',
    stock_actual: '',
    stock_minimo: '',
    id_proveedor: '',  // Este es el ID del proveedor
  });

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Cargar categorías y proveedores
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

    // Si estamos editando un producto, setea el estado con los datos del producto
    if (productoEdit) {
      setNuevoProducto({
        ...productoEdit,
        categoria: productoEdit.id_categoria || '',  // Asegúrate de asignar el ID de categoría
        id_proveedor: productoEdit.id_proveedor || '', // Asegúrate de asignar el ID de proveedor
      });
    } else {
      setNuevoProducto({
        id_producto: '',
        nombre: '',
        descripcion: '',
        categoria: '', // Dejamos vacío para que el select quede sin seleccionar
        precio_unitario: '',
        stock_actual: '',
        stock_minimo: '',
        id_proveedor: '', // Dejamos vacío también
      });
    }
  }, [productoEdit]);

  // Manejo de cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  // Enviar los datos para agregar o editar un producto
  const handleSubmitProducto = async (e) => {
    e.preventDefault();
  
    // Validación adicional para categoría y proveedor
    if (!nuevoProducto.nombre || !nuevoProducto.precio_unitario || !nuevoProducto.stock_actual) {
      setError('Todos los campos requeridos deben ser completados');
      return;
    }
  
    // Validar si categoría y proveedor están seleccionados
    if (!nuevoProducto.categoria || !nuevoProducto.id_proveedor) {
      setError('Debe seleccionar una categoría y un proveedor');
      return;
    }
  
    try {
      const url = productoEdit
        ? `http://localhost:3000/productos/${productoEdit.id_producto}` // Si estamos editando
        : 'http://localhost:3000/productos/'; // Si estamos agregando
      const method = productoEdit ? 'PUT' : 'POST'; // Determina si es PUT o POST
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
  
      if (response.ok) {
        alert(productoEdit ? 'Producto editado' : 'Producto agregado');
        setProductoEdit(null); // Resetea el estado de edición
        fetchProductos(); // Refresca la lista de productos
        setError(null); // Limpiar el error si fue exitoso
      } else {
        setError('Error al guardar el producto');
      }
    } catch (error) {
      setError('Error al guardar el producto');
      console.error('Error al guardar el producto:', error);
    }
  };

  // Si el estado de carga es verdadero, muestra un mensaje
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="productos-formulario">
      <h2>{productoEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
      <form onSubmit={handleSubmitProducto}>
        {/* Inputs del formulario */}
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
          name="categoria"
          value={nuevoProducto.categoria} // Este es el ID de la categoría
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre_categoria} {/* Mostramos el nombre, pero guardamos el ID */}
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
          value={nuevoProducto.id_proveedor} // Este es el ID del proveedor
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar Proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
              {proveedor.nombre_proveedor} {/* Mostramos el nombre, pero guardamos el ID */}
            </option>
          ))}
        </select>

        <button type="submit">{productoEdit ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </section>
  );
};

export default FormularioProducto;
