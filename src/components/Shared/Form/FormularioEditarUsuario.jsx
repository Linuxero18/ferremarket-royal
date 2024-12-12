import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function FormularioEditarUsuario() {
  const { id } = useParams(); // Obtén el ID del usuario desde la URL
  const location = useLocation(); // Para acceder a los datos enviados por el estado
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_usuario: '',
    nombre_usuario: '',
    email: '',
    password: '',
    id_rol: ''
  });

  const [loading, setLoading] = useState(true); // Para manejar la carga de datos
  const [roles, setRoles] = useState([]); // Para almacenar los roles

  useEffect(() => {
    // Si los datos vienen desde location.state, úsalos
    if (location.state?.usuario) {
      setFormData(location.state.usuario);
      setLoading(false);
    } else {
      // Si no, obtén los datos desde la API
      fetchUsuario();
    }
  }, [location.state]);

   useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/rol');
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          console.error('Error al obtener los roles:', await response.text());
          alert('No se pudo cargar la información de los roles.');
        }
      } catch (error) {
        console.error('Error al obtener los roles:', error);
        alert('Error al conectar con el servidor.');
      }
    };

    fetchRoles();
    }, []);


  const fetchUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        console.error('Error al obtener los datos del usuario:', await response.text());
        alert('No se pudo cargar la información del usuario.');
        navigate('/usuarios'); // Redirige si hay un error
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      alert('Error al conectar con el servidor.');
      navigate('/usuarios'); // Redirige si hay un error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Asegúrate de que el objeto `formData` contiene los campos correctos
    const { nombre_usuario, email, id_rol } = formData;
  
    // Verificar que los campos no estén vacíos
    if (!nombre_usuario || !email || !id_rol) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
  
    const formDataToSend = {
      nombre_usuario,
      email,
      id_rol: id_rol, // Asegúrate de que se envíe el id_rol
    };
  
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),  // Enviando los datos como JSON
      });
  
      if (response.ok) {
        alert('Usuario actualizado correctamente');
        navigate('/usuarios');  // Redirige al listado de usuarios
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData.message || 'Error desconocido');
        alert(`Error al actualizar el usuario: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error en la solicitud');
    }
  };
  
  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className="formulario-editar-container">
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre_usuario">Nombre:</label>
          <input
            type="text"
            id="nombre_usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo:</label>
          <input
            type="email"  
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <select
          name="id_rol"
          value={formData.id_rol}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar Rol</option>
          {roles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre_rol}
            </option>
          ))}
        </select>
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => navigate('/usuarios')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormularioEditarUsuario;
