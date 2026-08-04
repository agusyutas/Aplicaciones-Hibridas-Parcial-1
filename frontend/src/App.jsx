import './App.css'
import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'
import UsersABM  from './pages/UsersABM.jsx'
import BrandsABM from './pages/BrandsABM';
import Footer from './components/Footer.jsx'
import { useState } from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from '../auth/ProtectedRoute.jsx'

function App() {

  const [usuario, setUsuario] = useState(
  localStorage.getItem("usuario") || ""
);

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header>
            <Nav usuario={usuario} setUsuario={setUsuario} />
          </Header>

          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />

            <Route path='/cars' element={ 
              <ProtectedRoute>
                <Home /> 
              </ProtectedRoute>
              } />

              <Route path="/brands" element={
                  <ProtectedRoute>
                    <BrandsABM />
                  </ProtectedRoute>
                }
              />

            <Route path='/users' element={ <UsersABM /> } />
            <Route path='*' element={ <NotFound /> } />
          </Routes>

          <Footer descripcion = "Aplicacion Hibridas"/>
          
        </BrowserRouter>
      </AuthProvider>
    </>
  ) 
}

export default App
