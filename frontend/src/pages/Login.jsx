import { useState, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate();
    const [ error, setError ] = useState( false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useContext(AuthContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const endPoint = "https://aplicaciones-hibridas-final-o6zz.onrender.com/api/usuarios/auth";
            const user = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
            console.log( user);

            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( user)
            }

            const response = await fetch( endPoint, option);
            const json = await response.json();
            if (response.ok && json.jwt) {
                const usuario = {
                    _id: json.usuario._id,
                    name: json.usuario.name,
                    email: json.usuario.email,
                    rol: json.usuario.rol
                };
                console.log("Usuario guardado:", usuario);
                login(usuario, json.jwt);   
                navigate("/cars");
            }else {
                alert('Credenciales invalidas');
            }
            console.log( json );

        } catch (error) {
            
        } finally {

        }   
    }

  return (
    
    <main className='container-login'>
        <form onSubmit={ handleSubmit}  className='form-user-login'>
            <div className="form-header-login">
                <h2>Login</h2>
            </div>
            <label htmlFor='inputEmail'>Email</label>
            <input required ref={ emailRef } name='email' id="inputEmail" type="text" />

            <label htmlFor='inputPassword'>Contraseña</label>
            <input required ref={ passwordRef } name='password' id="inputPassword" type="password" />

            <button type="submit">Ingresar</button>

            { error && <Alert msg='Credenciales invalidas' />  }
            <Link to='/register' className='text-white'> ¿No tenes una cuenta? Registrate aquí </Link>

        </form>
    </main>
  )
}

export default Login