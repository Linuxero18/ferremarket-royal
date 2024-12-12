const TableUsuario = ({ usuarios, handleEdit, handleDelete }) => {
    if (usuarios.length === 0) {
      return <p>No hay productos disponibles</p>;
    }
  
    const handleDeleteConfirm = (id) => {
      const isConfirmed = window.confirm("¿Estás seguro de eliminar este usuario?");
      if (isConfirmed) {
        handleDelete(id);
      }
    };
  
    return (
      <section className="lista-usuarios">
        <h2>Lista de Usuarios</h2>
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nombre_rol}</td>
                <td>
                  <div className="buttons-container">
                    <button 
                      className="buttonEditar" 
                      onClick={() => handleEdit(usuario)} 
                      aria-label={`Editar usuario con ID ${usuario.id_usuario}`}
                    >
                      Editar
                    </button>
                    <button 
                      className="buttonEliminar" 
                      onClick={() => handleDeleteConfirm(usuario.id_usuario)}
                      aria-label={`Eliminar usuario con ID ${usuario.id_usuario}`}
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
  
export default TableUsuario;