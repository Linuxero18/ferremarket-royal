import Swal from 'sweetalert2';

const TableCategorias = ({ categorias = [], handleEdit, handleDelete }) => {
  if (categorias.length === 0) {
    return <p>No hay categorías disponibles</p>;
  }

  // Función de confirmación para eliminar categoría con SweetAlert2
  const handleDeleteConfirm = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta categoría se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id); // Llama a la función de eliminación si el usuario confirma
        Swal.fire(
          'Eliminado',
          'La categoría ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  };

  return (
    <section className="lista-categorias">
      <div className="table-wrapper">
        <table className="categorias-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id_categoria}>
                <td>{categoria.id_categoria}</td>
                <td>{categoria.nombre_categoria}</td>
                <td>{categoria.descripcion}</td>
                <td>
                  <div className="buttons-container">
                    <button
                      className="buttonEditar"
                      onClick={() => handleEdit(categoria)} // Llama a la función para editar
                      aria-label={`Editar categoría con ID ${categoria.id_categoria}`}
                    >
                      Editar
                    </button>
                    <button
                      className="buttonEliminar"
                      onClick={() => handleDeleteConfirm(categoria.id_categoria)} // Llama a la función de confirmación de eliminación
                      aria-label={`Eliminar categoría con ID ${categoria.id_categoria}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableCategorias;