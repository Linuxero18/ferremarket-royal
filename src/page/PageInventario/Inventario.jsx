import { useState, useEffect } from 'react';
import FormularioProducto from '../../components/Shared/Form/FormularioProducto';
import TableProducto from '../../components/Shared/Table/TableProducto';
import FormularioCategorias from '../../components/Shared/Form/FormularioCategorias';
import TableCategorias from '../../components/Shared/Table/TableCategorias';
import SearchBar from '../../components/Shared/SearchBar/SearchBar';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'Error',
        text: 'Error al cargar categorías',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Obtener proveedores
  const fetchProveedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/proveedores');
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al cargar proveedores',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
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
        Swal.fire({
          title: 'Éxito',
          text: categoriaEdit ? 'Categoría actualizada correctamente' : 'Categoría creada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setCategoriaEdit(null);
        fetchCategorias();
      } else {
        throw new Error('Error al guardar la categoría');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al guardar la categoría',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

// Eliminar categoría
const handleDeleteCategoria = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/categorias/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      Swal.fire({
        title: 'Éxito',
        text: 'Categoría eliminada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      fetchCategorias(); // Refrescar la lista de categorías
    } else {
      throw new Error('Error al eliminar la categoría');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Error al eliminar la categoría',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
};

  // Eliminar producto
  const handleDeleteProducto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Producto eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        fetchProductos();
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al eliminar el producto',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
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