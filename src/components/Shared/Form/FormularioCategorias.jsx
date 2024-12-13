import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const FormularioCategorias = ({ categoriaEdit, setCategoriaEdit, handleSaveCategoria }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion: '',
  });

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
  }, [categoriaEdit]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({ ...prev, [name]: value }));
  };

  // Mostrar alerta de error
  const showErrorAlert = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  };

  // Envío del formulario
  const handleSubmitCategoria = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nuevaCategoria.nombre_categoria.trim()) {
      showErrorAlert('El nombre de la categoría es obligatorio');
      return;
    }

    // Solo validar el nombre si estamos en "agregar", no cuando estamos en "editar"
    if (!categoriaEdit) {
      const namePattern = /^[a-zA-Z\s]+$/; // Permitir solo letras y espacios
      if (!namePattern.test(nuevaCategoria.nombre_categoria)) {
        showErrorAlert('El nombre de la categoría debe contener solo letras.');
        return;
      }
    }

    // Validar que la descripción no esté vacía
    if (!nuevaCategoria.descripcion.trim()) {
      showErrorAlert('La descripción no puede estar vacía.');
      return;
    }

    // Validar que la descripción no exceda un número máximo de caracteres
    if (nuevaCategoria.descripcion.length > 200) {
      showErrorAlert('La descripción no puede exceder los 200 caracteres.');
      return;
    }

    try {
      // Llamar a la función para guardar la categoría
      await handleSaveCategoria(nuevaCategoria);

      // Mostrar éxito
      Swal.fire({
        title: 'Éxito',
        text: 'La categoría ha sido guardada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      // Limpiar el formulario después de guardar
      setNuevaCategoria({
        nombre_categoria: '',
        descripcion: '',
      });
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir al guardar
      showErrorAlert(error.message || 'Error al guardar la categoría');
    }
  };

  return (
    <section className="categorias-formulario">
      <h2>{categoriaEdit ? 'Editar Categoría' : 'Agregar Categoría'}</h2>

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
