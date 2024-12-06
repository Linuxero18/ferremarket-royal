import React from 'react';
import { FaPlus, FaEdit, FaTrash} from 'react-icons/fa';

const TableUsuarios = ({usuarios, handleAgregarClick, handleEditarClick, handleEliminarClick, handleRadioButtonClick}) => {
  return (
    <div>
      <table className="table table-bordered table-striped usuarios-table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.nombre_usuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.password}</td>
                <td>{usuario.nombre_rol}</td>
                <td className="text-center">
                  <input
                    type="radio"
                    name="selectUser"
                    onClick={() => handleRadioButtonClick(usuario.id_usuario)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Cargando usuarios...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-3 usuarios-buttons">
        <button className="btn btn-success mr-2" onClick={handleAgregarClick}>
          <FaPlus /> Agregar
        </button>
        <button className="btn btn-warning mr-2" onClick={handleEditarClick}>
          <FaEdit /> Editar
        </button>
        <button className="btn btn-danger" onClick={handleEliminarClick}>
          <FaTrash /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default TableUsuarios
