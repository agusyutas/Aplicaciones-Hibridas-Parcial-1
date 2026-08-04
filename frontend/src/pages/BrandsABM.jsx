import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Brand from "../components/Brand";
import BrandsContainer from "../components/BrandsContainer";

const BrandsABM = () => {
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    marca: "",
    pais: ""
  });

const endPoint =
    "http://localhost:3000/api/marcas";

const navigate = useNavigate();
const { token } =
  useContext(AuthContext);
  useEffect(() => {

    if (!token) {
      navigate("/");
      return;
    }

const obtenerMarcas =
    async () => {
    try {
        const response =
        await fetch(endPoint, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

const data = await response.json();
    setBrands(data);
    } catch (error) {
        console.log(error);
    }
};
    obtenerMarcas();
  }, [token, navigate]);

const postBrand = async (brand) => {
    const jwt = localStorage.getItem("jwt");
    const response =
      await fetch(endPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", 
            Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(brand)
      });

    if (response.ok) {

      const data =
        await response.json();
      return data.marca;
    }
  };

  const updateBrand =
    async (id, brand) => {

    const jwt =
      localStorage.getItem("jwt");

    const response =
      await fetch(
        `${endPoint}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          },
          body:
            JSON.stringify(brand)
        }
      );

    return response.ok;
  };

  const deleteBrand =
    async (_id) => {

    const jwt =
      localStorage.getItem("jwt");

    try {

      const response =
        await fetch(
          `${endPoint}/${_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                `Bearer ${jwt}`
            }
          }
        );

      if (response.ok) {

        setBrands(
          brands.filter(
            brand =>
              brand._id !== _id
          )
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

const manejadorSubmit =async (e) => {
    e.preventDefault();
    try {
      if (editingId) {

        const actualizado = await updateBrand( editingId, form );

        if (actualizado) {
          setBrands(
            brands.map(
              (brand) =>
                brand._id === editingId
                  ? { ...brand, ...form }
                  : brand
            )
          );
          setEditingId(null);
        }
      } else {
        const nuevaMarca = await postBrand(form);
        setBrands([ ...brands, nuevaMarca ]);
      }
      setForm({
        marca: "",
        pais: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        "Error guardando marca"
      );

    }

  };

  const editBrand =
    (brand) => {

    setEditingId(
      brand._id
    );

    setForm({
      marca: brand.marca,
      pais: brand.pais
    });

  };

  return (

    <main className="cars-container">

      <Brand
        form={form}
        setForm={setForm}
        manejadorSubmit={
          manejadorSubmit
        }
      />

      <BrandsContainer
        brands={brands}
        deleteBrand={deleteBrand}
        editBrand={editBrand}
      />

    </main>

  );
};

export default BrandsABM;