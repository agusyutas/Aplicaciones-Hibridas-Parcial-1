const BrandsContainer = ({ brands, deleteBrand, editBrand }) => {
  return (
    <section className="cars-list">

      <h2>Marcas Cargadas:</h2>

      {brands.length === 0 ? (
        <p>No hay marcas cargadas.</p>
      ) : (

        brands.map((brand) => (
          <div key={brand._id} className="car-card">

            <h3>{brand.marca}</h3>
            <h4><strong>País:</strong>{" "}{brand.pais}</h4>
            <h4><strong>Cargado por:</strong>{" "}{brand.user?.name}</h4>

            <div className="delete-btn-container">

              <button className="btn-delete" onClick={() => deleteBrand(brand._id)}>
                Eliminar Marca
              </button>

              <button className="btn-edit" onClick={() => editBrand(brand)}>
                Editar Marca
              </button>

            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default BrandsContainer;