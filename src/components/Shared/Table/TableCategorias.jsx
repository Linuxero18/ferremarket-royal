const TableCategorias = ({ categorias = [], handleEdit, handleDelete }) => {
  if (categorias.length === 0) {
    return <p>No hay categorías disponibles</p>;
  }

  const handleDeleteConfirm = (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de eliminar esta categoría?");
    if (isConfirmed) {
      handleDelete(id); // Llamada directa a la función pasada como propiedad
    }
  };

  return (
    <section className="lista-categorias">
      <h2>Lista de Categorías</h2>
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
                    onClick={() => handleEdit(categoria)} // Pasa los datos al editar
                    aria-label={`Editar categoría con ID ${categoria.id_categoria}`}
                  >
                    Editar
                  </button>
                  <button
                    className="buttonEliminar"
                    onClick={() => handleDeleteConfirm(categoria.id_categoria)} // Llama a la función confirmación
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
    </section>
  );
};

export default TableCategorias;