import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableUsuarios from '../../components/Shared/Table/TableUsuarios';
import './Usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('El ID del usuario no está definido');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Usuario eliminado');
        fetchUsuarios();
      } else {
        console.error('Error en la respuesta del servidor:', await response.text());
        alert('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };
  

  const handleEdit = (usuario) => {
    if (!usuario || !usuario.id_usuario) {
      console.error('El usuario no es válido para editar:', usuario);
      return;
    }
    navigate(`/editar/${usuario.id_usuario}`, { state: { usuario } });
  };
  

  return (
    <div className="usuario-container">
      <header className="usuario-header">
        <h1>Gestión de Usuarios</h1>
        <p>Organiza tus contactos con estilo.</p>
      </header>
      <main className="usuario-main">
        <TableUsuarios 
          usuarios={usuarios} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default Usuarios;
