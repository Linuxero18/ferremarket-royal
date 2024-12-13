import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function FormularioEditarProveedor() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_proveedor: '',
    nombre_proveedor: '',
    contacto: '',
    telefono: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.proveedor) {
      setFormData(location.state.proveedor);
      setLoading(false);
    } else {
      fetchProveedor();
    }
  }, [location.state]);

  const fetchProveedor = async () => {
    try {
      const response = await fetch(`http://localhost:3000/proveedores/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        console.error('Error al obtener los datos del proveedor:', await response.text());
        alert('No se pudo cargar la información del proveedor.');
        navigate('/proveedores');
      }
    } catch (error) {
      console.error('Error al obtener los datos del proveedor:', error);
      alert('Error al conectar con el servidor.');
      navigate('/proveedores');
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

    const { nombre_proveedor, contacto, telefono } = formData;

    if (!nombre_proveedor || !contacto || !telefono) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/proveedores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_proveedor, contacto, telefono }),
      });

      if (response.ok) {
        alert('Proveedor actualizado correctamente');
        navigate('/proveedores');
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData.message || 'Error desconocido');
        alert(`Error al actualizar el proveedor: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      alert('Error en la solicitud');
    }
  };

  if (loading) {
    return <p>Cargando datos del proveedor...</p>;
  }

  return (
    <div className="formulario-editar-container">
      <h1>Editar Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre_proveedor">Nombre:</label>
          <input
            type="text"
            id="nombre_proveedor"
            name="nombre_proveedor"
            value={formData.nombre_proveedor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contacto">Contacto:</label>
          <input
            type="text"
            id="contacto"
            name="contacto"
            value={formData.contacto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => navigate('/proveedores')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormularioEditarProveedor;
