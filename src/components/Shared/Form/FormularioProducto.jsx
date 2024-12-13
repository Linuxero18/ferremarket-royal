import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormularioProducto = ({ 
  productoEdit, 
  setProductoEdit, 
  fetchProductos, 
  categorias,  
  proveedores  
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

  useEffect(() => {
    if (productoEdit) {
      const categoriaId = categorias.find(categoria => categoria.nombre_categoria === productoEdit.categoria)?.id_categoria || "";
      const proveedorId = proveedores.find(proveedor => proveedor.nombre_proveedor === productoEdit.proveedor)?.id_proveedor || "";

      setNuevoProducto({
        nombre: productoEdit.nombre,
        descripcion: productoEdit.descripcion || "",
        id_categoria: categoriaId,
        precio_unitario: productoEdit.precio_unitario,
        stock_actual: productoEdit.stock_actual,
        stock_minimo: productoEdit.stock_minimo,
        id_proveedor: proveedorId,
      });
    } else {
      setNuevoProducto({
        nombre: "",
        descripcion: "",
        id_categoria: "",
        precio_unitario: "",
        stock_actual: "",
        stock_minimo: "",
        id_proveedor: "",
      });
    }
    setError(null);
  }, [productoEdit, categorias, proveedores]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nuevoProducto.nombre || !nuevoProducto.precio_unitario || !nuevoProducto.stock_actual) {
        setError('Todos los campos requeridos deben ser completados');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos requeridos deben ser completados',
        });
        return;
    }

    // Validar que los campos no contengan solo números
    if (/^\d+$/.test(nuevoProducto.nombre)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre no puede contener solo números.',
        });
        return;
    }

    if (nuevoProducto.descripcion && /^\d+$/.test(nuevoProducto.descripcion)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La descripción no puede contener solo números.',
        });
        return;
    }

    // Validar que el precio unitario sea un número positivo
    if (isNaN(nuevoProducto.precio_unitario) || Number(nuevoProducto.precio_unitario) <= 0) {
        setError('El precio unitario debe ser un número positivo.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El precio unitario debe ser un número positivo.',
        });
        return;
    }

    // Validar que el stock actual y el stock mínimo sean números enteros no negativos
    if (isNaN(nuevoProducto.stock_actual) || Number(nuevoProducto.stock_actual) < 0) {
        setError('El stock actual debe ser un número entero no negativo.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El stock actual debe ser un número entero no negativo.',
        });
        return;
    }

    if (nuevoProducto.stock_minimo && (isNaN(nuevoProducto.stock_minimo) || Number(nuevoProducto.stock_minimo) < 0)) {
        setError('El stock mínimo debe ser un número entero no negativo.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El stock mínimo debe ser un número entero no negativo.',
        });
        return;
    }

    // Validar que la descripción no exceda un número máximo de caracteres
    if (nuevoProducto.descripcion.length > 200) {
        setError('La descripción no puede exceder los 200 caracteres.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La descripción no puede exceder los 200 caracteres.',
        });
        return;
    }

    // Si todas las validaciones pasan, proceder a enviar el formulario
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
            Swal.fire({
              icon: 'success',
              title: productoEdit ? 'Producto editado' : 'Producto agregado',
              text: 'La operación se realizó correctamente.',
            });
            setProductoEdit(null);
            fetchProductos();
            setError(null);
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Error al guardar el producto');
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorData.message || 'Error al guardar el producto',
            });
        }
    } catch (error) {
        setError('Error al guardar el producto');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar el producto',
        });
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
        name="id_categoria"
        value={nuevoProducto.id_categoria}
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
        min="0"
      />
      <input
        type="number"
        name="stock_actual"
        value={nuevoProducto.stock_actual}
        onChange={handleInputChange}
        placeholder="Stock Actual"
        required
        min="0"
      />
      <input
        type="number"
        name="stock_minimo"
        value={nuevoProducto.stock_minimo}
        onChange={handleInputChange}
        placeholder="Stock Mínimo"
        min="0"
      />
      <select
        name="id_proveedor"
        value={nuevoProducto.id_proveedor}
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
      {productoEdit && (
        <button 
          type="button" 
          onClick={() => setProductoEdit(null)}
        >
          Cancelar
        </button>
      )}
    </form>
  </section>
);
};

export default FormularioProducto;
