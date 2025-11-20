const Car = ({ form, setForm, manejadorSubmit }) => {

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="car-wrapper">

      <form className="car-form" onSubmit={manejadorSubmit}>
        <h2>Cargar Auto</h2>

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
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="año"
          placeholder="Año"
          value={form.año}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="motor"
          placeholder="Motor"
          value={form.motor}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="potencia"
          placeholder="Potencia"
          value={form.potencia}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="velocidadMax"
          placeholder="Velocidad Máxima"
          value={form.velocidadMax}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="combustible"
          placeholder="Combustible"
          value={form.combustible}
          onChange={handleChange}
          required
        />

        <div className="btn-submit">
          <button type="submit">Agregar Auto</button>
        </div>
      </form>

    </div>
  );
};

export default Car;
