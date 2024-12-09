import { useEffect, useState } from 'react';
import FormProducto from '../../components/Shared/Form/FormularioProducto';
import TableProducto from '../../components/Shared/Table/TableProducto';
import './Inventario.css'

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3000/productos/');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, { method: 'DELETE' });
        if (response.ok) {
          alert('Producto eliminado');
          fetchProductos();
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };
  

  const handleEdit = (producto) => {
    setProductoEdit(producto);
  };

  return (
    <div className="inventario-container">
      <header className="inventario-header">
        <h1>Gestión de Inventario</h1>
        <p>Organiza y optimiza tus productos y contactos con estilo.</p>
      </header>
      <main className="inventario-main">
        <FormProducto
          productoEdit={productoEdit} 
          setProductoEdit={setProductoEdit} 
          fetchProductos={fetchProductos} 
        />
        <TableProducto
          productos={productos} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
        />
      </main>
    </div>
  );
}

export default Inventario;