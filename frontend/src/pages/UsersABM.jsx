import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UsersContainer from "../components/UsersContainer";
import User from "../components/User";

const UsersABM = () => {

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rol: "cliente"
  });
  const endPoint = "http://localhost:3000/api/usuarios";
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  useEffect(() => {

    if (!token) {
        navigate("/");
        return;
    }

    const obtenerUsuarios = async () => {
      try {
        const response = await fetch(endPoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        setUsers(data);

      } catch (error) {
        console.log(error);
      }
    };

    obtenerUsuarios();

  }, [token, navigate]);

  const handleDeleteUser = async (_id) => {

    const jwt = localStorage.getItem("jwt");

    try {

      const response = await fetch(`${endPoint}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (response.ok) {

        const data = await response.json();
        console.log(data);

        setUsers(users.filter(usuario => usuario._id !== _id));
      }

    } catch (error) {

      console.error(error);
      alert("Error al eliminar usuario");

    }
  };

const handleEditUser = (usuario) => {

  setEditingId(usuario._id);

  setForm({
    name: usuario.name,
    email: usuario.email,
    password: "",
    rol: usuario.rol
  });

};

const updateUser = async (id, usuario) => {

  const jwt = localStorage.getItem("jwt");

  const response = await fetch(`${endPoint}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify(usuario)
  });

  return response.ok;
};

const handleSubmit = async (e) => {

  e.preventDefault();

  const ok = await updateUser(editingId, form);
  if (ok) {
    setUsers(
      users.map((u) =>
        u._id === editingId
          ? {
              ...u,
              name: form.name,
              email: form.email,
              rol: form.rol
            }
          : u
      )
    );
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      password: "",
      rol: "cliente"
    });
    alert("Usuario actualizado");
  } else {
    alert("No se pudo actualizar");
  }
};

  return (
    <main className="container">
      {editingId && (

  <div className="user-form-container">

    <form className="user-form" onSubmit={handleSubmit}>

      <h2>Editar Usuario</h2>

      <div className="input-group">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />
      </div>

      <div className="input-group">
        <label>Nueva contraseña</label>
        <input
          type="password"
          placeholder="Dejar vacío para no modificar"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />
      </div>

      <div className="input-group">
        <label>Rol</label>
        <select
          value={form.rol}
          onChange={(e)=>setForm({...form,rol:e.target.value})}
        >
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <div className="form-buttons">
        <button className="btn-save" type="submit">
          Guardar Cambios
        </button>

        <button
          className="btn-cancel"
          type="button"
          onClick={() => {
            setEditingId(null);
            setForm({
              name: "",
              email: "",
              password: "",
              rol: "cliente"
            });
          }}
        >
          Cancelar
        </button>
      </div>

    </form>

  </div>

)}
      <UsersContainer>

        {users.length === 0 ? (

          <p>No hay usuarios registrados.</p>

        ) : (

          users.map(usuario => (
            <User
              key={usuario._id}
              _id={usuario._id}
              name={usuario.name}
              email={usuario.email}
              rol={usuario.rol}
              created={usuario.created}
              eliminarUsuario={handleDeleteUser}
              editarUsuario={() => handleEditUser(usuario)}
              usuarioLogueado={user}
            />
          ))

        )}

      </UsersContainer>

    </main>
  );
};

export default UsersABM;