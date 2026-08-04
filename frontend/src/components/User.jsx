const User = ({ _id, name, email, rol,eliminarUsuario, editarUsuario, usuarioLogueado}) => {

  return (
     <div className="user-card">
      <div className="user-header">
        <div className="user-avatar">
          {name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{name}</h3>
          <p className="user-email">{email}</p>
        </div>
      </div>

      <div className="user-info">
        <p>
          <strong>Rol:</strong>
          <span className={`badge ${rol}`}>
            {rol}
          </span>
        </p>

      </div>

      {usuarioLogueado?.rol === "admin" && (
        <div className="user-actions">
          <button className="btn-edit"
           onClick={editarUsuario}>
            Editar
          </button>

          <button
            className="btn-delete"
            onClick={() => eliminarUsuario(_id)}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default User;