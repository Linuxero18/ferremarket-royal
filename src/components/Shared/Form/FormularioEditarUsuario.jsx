import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditarUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    nombre_usuario: '',
    email: '',
    password: '',
    id_rol: 1,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los roles
    fetch('http://localhost:3000/rol')
      .then((response) => response.json())
      .then((data) => setRoles(data));

    // Cargar los datos del usuario
    fetch(`http://localhost:3000/usuarios/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUsuario(data);
        setUpdatedUser({
          nombre_usuario: data.nombre_usuario,
          email: data.email,
          password: '', // No mostramos la contraseña por seguridad
          id_rol: data.id_rol,
        });
      })
      .catch((error) => console.error('Error al cargar el usuario:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Si la contraseña está vacía, no la enviamos al backend
    const userToUpdate = { ...updatedUser };
    if (!userToUpdate.password) {
      delete userToUpdate.password; // Elimina la contraseña del objeto si está vacía
    }
  
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userToUpdate),
    })
      .then((response) => {
        if (response.ok) {
          alert('Usuario actualizado correctamente');
          navigate('/usuarios'); // Redirigir a la lista de usuarios
        } else {
          alert('Error al actualizar el usuario');
        }
      })
      .catch((error) => console.error('Error al actualizar el usuario:', error));
  };

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="editar-usuario-container">
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="nombre_usuario"
            value={updatedUser.nombre_usuario}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={updatedUser.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Rol:</label>
          <select
            name="id_rol"
            value={updatedUser.id_rol}
            onChange={handleInputChange}
          >
            {roles.map((role) => (
              <option key={role.id_rol} value={role.id_rol}>
                {role.nombre_rol}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarUsuario;
