import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableUsuarios from '../../components/Shared/Table/TableUsuarios';
import './Usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre_usuario: '',
    email: '',
    password: '',
    id_rol: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
    fetchRoles(); // Llamamos a la función para obtener los roles
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

  // Función para obtener los roles desde la API
  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:3000/rol');
      const data = await response.json();
      setRoles(data); // Guardamos los roles en el estado
    } catch (error) {
      console.error('Error al cargar los roles:', error);
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
    navigate(`/editarUsuario/${usuario.id_usuario}`, { state: { usuario } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        alert('Usuario registrado correctamente');
        fetchUsuarios();
        setShowForm(false); // Ocultar formulario
        setNewUser({ nombre_usuario: '', email: '', password: '', id_rol: 1 });
      } else {
        const errorData = await response.json();
        alert(`Error al registrar el usuario: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="usuario-container">
      <header className="usuario-header">
        <h1>Gestión de Usuarios</h1>
        <p>Organiza tus contactos con estilo.</p>
      </header>
      <main className="usuario-main">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar formulario' : 'Registrar nuevo usuario'}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="usuario-form">
            <div>
              <label>Nombre de usuario:</label>
              <input
                type="text"
                name="nombre_usuario"
                value={newUser.nombre_usuario}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Rol:</label>
              <select
                name="id_rol"
                value={newUser.id_rol}
                onChange={handleInputChange}
              >
                {roles.map((role) => (
                  <option key={role.id_rol} value={role.id_rol}>
                    {role.nombre_rol}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success">Registrar</button>
          </form>
        )}
        <TableUsuarios
          usuarios={usuarios}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default Usuarios;
