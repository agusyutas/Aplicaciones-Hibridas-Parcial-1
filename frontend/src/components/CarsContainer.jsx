const CarsContainer = ({ cars, deleteCar }) => {
  return (
    <section className="cars-list">
      <h2>Autos Cargados:</h2>

      {cars.length === 0 ? (
        <p>No hay autos cargados aún.</p>
      ) : (
        cars.map((auto) => (
            <div key={auto._id} className="car-card">
                <h3>{auto.marca} — {auto.modelo}</h3>
                    <div className="car-info">
                        <p><strong>Año:</strong> {auto.año}</p>
                        <p><strong>Motor:</strong> {auto.motor}</p>
                        <p><strong>Potencia:</strong> {auto.potencia}</p>
                        <p><strong>Velocidad Máxima:</strong> {auto.velocidadMax}</p>
                        <p><strong>Combustible:</strong> {auto.combustible}</p>
                    </div>
                    <div className="delete-btn-container">
                      <button className="btn-delete" onClick={() => deleteCar(auto._id)}> 
                        Eliminar Auto 
                      </button>
                    </div>
            </div>
        ))
      )}
    </section>
  );
};

export default CarsContainer;


