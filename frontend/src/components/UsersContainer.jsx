const UsersContainer = ({ children }) => {
  return (
    <section className="users-container">
      <h2>Usuarios Registrados</h2>
      {children}
    </section>
  );
};

export default UsersContainer;
