import { useEffect, useState } from "react";

const FormularioCategorias = ({ categoriaEdit, setCategoriaEdit, handleSaveCategoria }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion: '',
  });
  const [error, setError] = useState(null);

  // Efecto para establecer los valores cuando se edita una categoría
  useEffect(() => {
    if (categoriaEdit) {
      setNuevaCategoria({
        nombre_categoria: categoriaEdit.nombre_categoria,
        descripcion: categoriaEdit.descripcion || '', // Añadir valor por defecto para descripción
      });
    } else {
      // Resetear el formulario
      setNuevaCategoria({
        nombre_categoria: '',
        descripcion: '',
      });
    }
    // Limpiar el error cuando cambia el estado de edición
    setError(null);
  }, [categoriaEdit]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({ ...prev, [name]: value }));
  };

  // Envío del formulario
  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!nuevaCategoria.nombre_categoria.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }

    try {
      // Llamar a la función para guardar la categoría
      await handleSaveCategoria(nuevaCategoria);
      
      // Limpiar el formulario después de guardar
      setNuevaCategoria({
        nombre_categoria: '',
        descripcion: '',
      });
      setError(null);
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir al guardar
      setError(error.message || 'Error al guardar la categoría');
    }
  };

  return (
    <section className="categorias-formulario">
      <h2>{categoriaEdit ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmitCategoria}>
        <input
          type="text"
          name="nombre_categoria"
          value={nuevaCategoria.nombre_categoria}
          onChange={handleInputChange}
          placeholder="Nombre de la categoría"
          required
        />
        <input
          type="text"
          name="descripcion"
          value={nuevaCategoria.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción"
        />
        <button type="submit">
          {categoriaEdit ? 'Actualizar' : 'Agregar'}
        </button>
        {categoriaEdit && (
          <button 
            type="button" 
            onClick={() => setCategoriaEdit(null)}
          >
            Cancelar
          </button>
        )}
      </form>
    </section>
  );
};

export default FormularioCategorias;