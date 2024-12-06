import { useState, useEffect } from 'react';
import axios from 'axios';
import './Usuarios.css';
import TableUsuarios from '../../components/Shared/Table/TableUsuarios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios/data');
      setUsuarios(response.data);
    } catch (err) {
      setError('Error al cargar los datos. Inténtalo más tarde.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleRadioButtonClick = (id_usuario) => {
    setSelectedUserId(id_usuario);
  };

  const handleAgregarClick = () => {
    alert('Agregar función aquí');
  };

  const handleEditarClick = () => {
    if (!selectedUserId) {
      alert('Por favor, selecciona un usuario para editar.');
      return;
    }
    alert(`Editar función aquí para el usuario con id: ${selectedUserId}`);
  };

  const handleEliminarClick = () => {
    if (!selectedUserId) {
      alert('Por favor, selecciona un usuario para eliminar.');
      return;
    }
    alert(`Eliminar función aquí para el usuario con id: ${selectedUserId}`);
  };

  return (
    <div className="usuarios-container">
      <h2 className="text-center usuarios-title">Lista de Usuarios</h2>
      {error && <div className="alert alert-danger usuarios-error">{error}</div>}
      {selectedUserId && (
        <div className="alert alert-info usuarios-info text-center">
          Has seleccionado el ID: <strong>{selectedUserId}</strong>
        </div>
      )}
      {usuarios.length > 0 ? (
        <TableUsuarios
          usuarios={usuarios}
          handleAgregarClick={handleAgregarClick}
          handleEditarClick={handleEditarClick}
          handleEliminarClick={handleEliminarClick}
          handleRadioButtonClick={handleRadioButtonClick}
        />
      ) : (
        <div className="text-center">Cargando usuarios...</div>
      )}
    </div>
  );
};

export default Usuarios;
