import React from "react";
import { useState, useEffect, useContext } from 'react';
import Car from "../components/Car";
import CarsContainer from "../components/CarsContainer";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    año: "",
    motor: "",
    potencia: "",
    velocidadMax: "",
    combustible: ""
});

const endPoint = "https://aplicaciones-hibridas-final-o6zz.onrender.com/api/autos";
const navigate = useNavigate();
const { token, user } = useContext(AuthContext);

useEffect(() => {
          if (!token) {
              navigate("/");
              return;
          }
          const obtenerAutos = async () => {
              try {
                  const response = await fetch(endPoint, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  });
                  const data = await response.json();
                  setCars(data);
              } catch (error) {
                  console.log(error);
              }
          };
          obtenerAutos();
}, [token]);

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

const updateAuto = async (id, auto) => {
const jwt = localStorage.getItem("jwt");
const option = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`
  },
  body: JSON.stringify(auto)
};

const resp = await fetch(`${endPoint}/${id}`, option);
  return resp.ok;
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
      if (editingId) {

        const actualizado = await updateAuto(editingId, form);

        if (actualizado) {
          setCars(
            cars.map((car) =>
              car._id === editingId
                ? { ...car, ...form }
                : car
            )
          );
          setEditingId(null);
        }
      } else {
        const nuevoAuto = await postAuto(form);
        setCars([...cars, nuevoAuto]);
      }
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
      alert("Error guardando auto");
    }
  };

const handleEditCar = (auto) => {
  setEditingId(auto._id);
  setForm({
    marca: auto.marca,
    modelo: auto.modelo,
    año: auto.año,
    motor: auto.motor,
    potencia: auto.potencia,
    velocidadMax: auto.velocidadMax,
    combustible: auto.combustible
  });
};

    return (
         <main className="cars-container">
            <Car
                form={form}
                setForm={setForm}
                manejadorSubmit={manejadorSubmit}
                usuario={user}
            />
            <CarsContainer 
                cars={cars}
                deleteCar={handleDeleteCar}
                editCar={handleEditCar}
            />
        </main>
    )
}

export default Home