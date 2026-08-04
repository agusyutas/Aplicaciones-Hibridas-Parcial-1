import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

const Nav = ( {usuario, setUsuario} ) => {
const navigate = useNavigate();
const {logout, user} = useContext(AuthContext);
const logueado = !!user?.name;

   useEffect(() => {
    const userName = localStorage.getItem("usuario");

    if (userName) {
      setUsuario(userName);
    }
  }, []);

  const handlerlogout = () => {
    const salir = confirm("¿Seguro que desea Salir?");

    if (salir) {
      logout();
      localStorage.removeItem("jwt");
      localStorage.removeItem("usuario");
      navigate("/");
    }
  };

  return (
    <nav>
        <h1>API autos</h1>
             <ul className="menu-api">
        {user?.name && (
        <li>
          <NavLink to="/cars">Autos</NavLink>
        </li>
        )}

        {user?.name && (
        <li>
          <NavLink to="/brands">Marcas</NavLink>
        </li>
      )}
        
        {user?.rol === "admin" && (
        <li>
          <NavLink to="/users">Usuarios</NavLink>
        </li>
        )}
         
        {!user?.name && (
          <>
            <li>
              <NavLink to="/register">Registro</NavLink>
            </li>

            <li>
              <NavLink to="/">Login</NavLink>
            </li>
          </>
        )}
      </ul>
        <div className="user-info">
            {logueado ? (
          <>
            <p>{user?.name || usuario}</p>

            <div className="user-image"></div>

            <button onClick={handlerlogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              {" "}Cerrar Sesión
            </button>
          </>
        ) : (
          <>
          </>
        )}

        </div>
    </nav>
  )
}

export default Nav