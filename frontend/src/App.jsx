import './App.css'
import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

  const usuario = localStorage.getItem('usuario') || '';

  return (
    <>
      <BrowserRouter>

        <Header>
          <Nav usuario={usuario}/>
        </Header>

        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/cars' element={ <Home /> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>

        <Footer descripcion = "Aplicacion Hibridas"/>
        
      </BrowserRouter>
    </>
  ) 
}

export default App
