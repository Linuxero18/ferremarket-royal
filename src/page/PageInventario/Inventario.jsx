import { useState, useEffect } from 'react';
import FormularioProducto from '../../components/Shared/Form/FormularioProducto';
import TableProducto from '../../components/Shared/Table/TableProducto';
import FormularioCategorias from '../../components/Shared/Form/FormularioCategorias';
import TableCategorias from '../../components/Shared/Table/TableCategorias';
import SearchBar from '../../components/Shared/SearchBar/SearchBar'; // Importa el nuevo componente de búsqueda

import "./Inventario.css";

const PageInventario = () => {
  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [searchTermProducto, setSearchTermProducto] = useState(''); // Término de búsqueda para productos

  // Estados para categorías
  const [categorias, setCategorias] = useState([]);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [searchTermCategoria, setSearchTermCategoria] = useState(''); // Término de búsqueda para categorías

  // Estados para proveedores
  const [proveedores, setProveedores] = useState([]);

  // Fetch inicial de datos
  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchProveedores();
  }, []);

  // Obtener productos
  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:3000/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Obtener categorías
  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/categorias');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  // Obtener proveedores
  const fetchProveedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/proveedores');
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  // Guardar categoría
  const handleSaveCategoria = async (categoria) => {
    const url = categoriaEdit
      ? `http://localhost:3000/categorias/${categoriaEdit.id_categoria}`
      : 'http://localhost:3000/categorias';
    const method = categoriaEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria),
      });

      if (response.ok) {
        alert(categoriaEdit ? 'Categoría actualizada' : 'Categoría creada');
        setCategoriaEdit(null);
        fetchCategorias();
      } else {
        throw new Error('Error al guardar la categoría');
      }
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  };

  // Eliminar categoría
  const handleDeleteCategoria = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/categorias/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Categoría eliminada');
        fetchCategorias();
      } else {
        throw new Error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  // Eliminar producto
  const handleDeleteProducto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Producto eliminado');
        fetchProductos();
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Filtrar productos y categorías por término de búsqueda
  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTermProducto.toLowerCase())
  );

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nombre_categoria.toLowerCase().includes(searchTermCategoria.toLowerCase())
  );

  return (
    <div className="page-inventario">
      <h1>Gestión de Inventario</h1>
  
      <section className="productos-section">
        <FormularioProducto
          productoEdit={productoEdit}
          setProductoEdit={setProductoEdit}
          fetchProductos={fetchProductos}
          categorias={categorias}
          proveedores={proveedores}
        />
        <div className="table-container">
          <SearchBar
            searchTerm={searchTermProducto}
            setSearchTerm={setSearchTermProducto}
            placeholder="Buscar producto por nombre"
          />
          <TableProducto
            productos={filteredProductos}
            handleEdit={(producto) => setProductoEdit(producto)}
            handleDelete={handleDeleteProducto}
          />
        </div>
      </section>
  
      <section className="categorias-section">
        <FormularioCategorias
          categoriaEdit={categoriaEdit}
          setCategoriaEdit={setCategoriaEdit}
          handleSaveCategoria={handleSaveCategoria}
        />
        <div className="table-container">
          <SearchBar
            searchTerm={searchTermCategoria}
            setSearchTerm={setSearchTermCategoria}
            placeholder="Buscar categoría por nombre"
          />
          <TableCategorias
            categorias={filteredCategorias}
            handleEdit={(categoria) => setCategoriaEdit(categoria)}
            handleDelete={handleDeleteCategoria}
          />
        </div>
      </section>
    </div>
  );
};

export default PageInventario;
