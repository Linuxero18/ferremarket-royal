import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableProveedores from '../../components/Shared/Table/TableProveedores';
import './Proveedores.css';

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProveedor, setNewProveedor] = useState({
    nombre_proveedor: '',
    contacto: '',
    telefono: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProveedor({ ...newProveedor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/proveedores/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProveedor),
      });
      if (response.ok) {
        alert('Proveedor registrado correctamente');
        fetchProveedores();
        setShowForm(false);
        setNewProveedor({ nombre_proveedor: '', contacto: '', telefono: '' });
      } else {
        const errorData = await response.json();
        alert(`Error al registrar el proveedor: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al registrar el proveedor:', error);
    }
  };

  return (
    <div className="proveedor-container">
      <header className="proveedor-header">
        <h1>Gestión de Proveedores</h1>
        <p>Administra tus proveedores fácilmente.</p>
      </header>
      <main className="proveedor-main">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar formulario' : 'Registrar nuevo proveedor'}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="proveedor-form">
            <div>
              <label>Nombre del proveedor:</label>
              <input
                type="text"
                name="nombre_proveedor"
                value={newProveedor.nombre_proveedor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Contacto:</label>
              <input
                type="text"
                name="contacto"
                value={newProveedor.contacto}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                type="number"
                name="telefono"
                value={newProveedor.telefono}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Registrar
            </button>
          </form>
        )}
        <TableProveedores
          proveedores={proveedores}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default Proveedores;
