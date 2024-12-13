import { useState, useEffect } from 'react';

const FormularioProducto = ({ 
  productoEdit, 
  setProductoEdit, 
  fetchProductos, 
  categorias,  // Nuevo prop para categorías
  proveedores  // Nuevo prop para proveedores
}) => {
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

  const [error, setError] = useState(null);

  // Actualizar los datos del formulario cuando se edita un producto
  useEffect(() => {
    if (productoEdit) {
      // Buscar el ID correspondiente para la categoría
      const categoriaId = categorias.find(categoria => categoria.nombre_categoria === productoEdit.categoria)?.id_categoria || "";
  
      // Buscar el ID correspondiente para el proveedor
      const proveedorId = proveedores.find(proveedor => proveedor.nombre_proveedor === productoEdit.proveedor)?.id_proveedor || "";
  
      setNuevoProducto({
        nombre: productoEdit.nombre,
        descripcion: productoEdit.descripcion || "",
        categoria: categoriaId, // Asignar el ID de categoría
        precio_unitario: productoEdit.precio_unitario,
        stock_actual: productoEdit.stock_actual,
        stock_minimo: productoEdit.stock_minimo,
        proveedor: proveedorId, // Asignar el ID de proveedor
      });
    } else {
      // Resetear el formulario
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio_unitario: "",
        stock_actual: "",
        stock_minimo: "",
        proveedor: "",
      });
    }
    setError(null); // Limpiar errores al cambiar producto
  }, [productoEdit, categorias, proveedores]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProducto = async (e) => {
  e.preventDefault();

  console.log('Nuevo Producto:', nuevoProducto); 

  if (!nuevoProducto.nombre || !nuevoProducto.precio_unitario || !nuevoProducto.stock_actual) {
    setError('Todos los campos requeridos deben ser completados');
    return;
  }

  if (!nuevoProducto.categoria || !nuevoProducto.proveedor) {
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
      const errorData = await response.json();
      setError(errorData.message || 'Error al guardar el producto');
    }
  } catch (error) {
    setError('Error al guardar el producto');
  }
};


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
        />
<select
  name="categoria"
  value={nuevoProducto.categoria}
  onChange={handleInputChange}
  required
>
  <option value="">Selecciona una categoría</option>
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
        />
<select
  name="proveedor"
  value={nuevoProducto.proveedor}
  onChange={handleInputChange}
  required
>
  <option value="">Selecciona un proveedor</option>
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