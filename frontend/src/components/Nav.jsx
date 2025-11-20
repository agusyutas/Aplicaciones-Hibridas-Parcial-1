import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"

const Nav = ( {usuario} ) => {
  const [ logueado, setLogueado ] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const userName = localStorage.getItem("usuario");
    if(token) {
      setLogueado(true); 
      setUsuario(userName); 
    } 
  }, []);

  const logout = ( ) => {
    const salir = confirm('¿Seguro que desea Salir? ');
    if( salir) {
      setLogueado(  false );
      localStorage.removeItem('jwt');
      localStorage.removeItem('usuario');
      navigate('/');
    }
  }

  const login = ( ) => {
      setLogueado(  true );
  }

  return (
    <nav>
        <h1>API autos</h1>
            <ul className="menu-api">
                <li>
                    <NavLink to='/cars'>Autos</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Registro</NavLink>
                </li>
                <li>
                    <NavLink to="/">Login</NavLink>
                </li>
            </ul>
        <div className="user-info">
            {
               logueado ? (
                <>
                    <p> {usuario} </p>
                    <div className="user-image"></div>
                    <button onClick={ logout }><i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</button>
                </>
               ) : (
                  <>
                    <p> Loguearse</p>
                    <button onClick={login }><i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión</button>
                  </>
               )
            }

        </div>
    </nav>
  )
}

export default Nav