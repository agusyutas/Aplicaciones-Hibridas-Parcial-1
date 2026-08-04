const Brand = ({ form, setForm, manejadorSubmit }) => {

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="car-wrapper">

      <form className="car-form" onSubmit={manejadorSubmit}>

        <h2> {form._id ? "Editar Marca": "Cargar Marca"} </h2>

        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pais"
          placeholder="País"
          value={form.pais}
          onChange={handleChange}
          required
        />

        <div className="btn-submit">
          <button type="submit">
            {form._id
              ? "Actualizar Marca"
              : "Agregar Marca"}
          </button>
        </div>

      </form>

    </div>
  );
};

export default Brand;