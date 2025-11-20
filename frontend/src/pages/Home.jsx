import React from "react";
import { useState, useEffect } from 'react';
import Car from "../components/Car";
import CarsContainer from "../components/CarsContainer";
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [cars, setCars] = useState([]);
    const [form, setForm] = useState({
    marca: "",
    modelo: "",
    año: "",
    motor: "",
    potencia: "",
    velocidadMax: "",
    combustible: ""
  });

  const endPoint = "http://localhost:3000/api/autos";
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/");
      return;
    }

    fetch(endPoint, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then(res => res.json())
      .then(json => {
        setCars(json);
      })
      .catch(err => {
        console.log(err);
        alert("Error cargando autos");
      });
  }, []);

   const postAuto = async (auto) => {
    const jwt = localStorage.getItem("jwt");
    const option = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${jwt}` },
      body: JSON.stringify(auto)
    };

    const resp = await fetch(endPoint, option);
    if (resp.ok) {
      const data = await resp.json();
      return data.auto; 
    }
  };

  const handleDeleteCar = async ( _id) => {
    const jwt = localStorage.getItem("jwt");
    console.log(`Eliminado auto ${_id}`)
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }

    try {
      const resp = await fetch( `${endPoint}/${_id}`, option);
      if( resp.ok ){
        const data = await resp.json();
        console.log(data);
        setCars(cars.filter(car => car._id !== _id));

      }
    } catch (error) {
      console.error(error);
      alert('Error del Servidor al Eliminar el auto');
    }
  }

  const manejadorSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoAuto = await postAuto(form);

      setCars([...cars, nuevoAuto]); 

      setForm({
        marca: "",
        modelo: "",
        año: "",
        motor: "",
        potencia: "",
        velocidadMax: "",
        combustible: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error creando auto");
    }
  };

    return (
         <main className="cars-container">
            <Car
                form={form}
                setForm={setForm}
                manejadorSubmit={manejadorSubmit}
            />
            <CarsContainer 
                cars={cars}
                deleteCar={handleDeleteCar}
            />
        </main>
    )
}

export default Home