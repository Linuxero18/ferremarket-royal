import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableProveedores from '../../components/Shared/Table/TableProveedores'; // Asegúrate de que este archivo esté correctamente ubicado
import './Proveedores.css'; // Asegúrate de tener un archivo CSS específico para estilos de proveedores

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/proveedores/');
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error('Error al cargar los proveedores:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('El ID del proveedor no está definido');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/proveedores/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Proveedor eliminado');
        fetchProveedores();
      } else {
        console.error('Error en la respuesta del servidor:', await response.text());
        alert('Error al eliminar el proveedor');
      }
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };

  const handleEdit = (proveedor) => {
    if (!proveedor || !proveedor.id_proveedor) {
      console.error('El proveedor no es válido para editar:', proveedor);
      return;
    }
    navigate(`/editarProveedor/${proveedor.id_proveedor}`, { state: { proveedor } });
  };

  return (
    <div className="proveedor-container">
      <header className="proveedor-header">
        <h1>Gestión de Proveedores</h1>
        <p>Administra tus proveedores fácilmente.</p>
      </header>
      <main className="proveedor-main">
        <TableProveedores 
          proveedores={proveedores} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
        />
      </main>
    </div>
  );
};

export default Proveedores;
