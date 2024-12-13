const TableProveedores = ({ proveedores, handleEdit, handleDelete }) => {
    if (proveedores.length === 0) {
      return <p>No hay proveedores disponibles</p>;
    }
  
    const handleDeleteConfirm = (id) => {
      const isConfirmed = window.confirm("¿Estás seguro de eliminar este proveedor?");
      if (isConfirmed) {
        handleDelete(id);
      }
    };
  
    return (
      <section className="lista-proveedores">
        <h2>Lista de Proveedores</h2>
        <table className="proveedores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id_proveedor}>
                <td>{proveedor.id_proveedor}</td>
                <td>{proveedor.nombre_proveedor}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>
                  <div className="buttons-container">
                    <button
                      className="buttonEditar"
                      onClick={() => handleEdit(proveedor)}
                      aria-label={`Editar proveedor con ID ${proveedor.id_proveedor}`}
                    >
                      Editar
                    </button>
                    <button
                      className="buttonEliminar"
                      onClick={() => handleDeleteConfirm(proveedor.id_proveedor)}
                      aria-label={`Eliminar proveedor con ID ${proveedor.id_proveedor}`}
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
  
  export default TableProveedores;
  