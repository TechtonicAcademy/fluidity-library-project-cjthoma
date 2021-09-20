import { NavLink } from 'react-router-dom';
import '../styles/home.scss';

const Home = () => {
  return (
    <>
      <section className="hero">
        <h1 className="hero__title">
          Books: <span>The only time it's okay to leave them on read.</span>
        </h1>
      </section>

      <section className="main">
        <h3 className="main__title">Welcome to the Library</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
          justo pharetra, venenatis elit eget, tempor est. Nunc bibendum sit
          amet nisl id lacinia. Aenean placerat semper est et molestie. Aliquam
          eget elit nisi. Pellentesque ultrices odio felis, imperdiet pharetra
          risus gravida eu. In scelerisque felis justo, sit amet eleifend sapien
          sodales in. Nulla vitae dui ligula. Aenean est est, iaculis eu finibus
          ac, vehicula eget magna. Sed euismod bibendum condimentum. Praesent
          hendrerit sapien urna, non finibus erat viverra sit amet.
        </p>
        <NavLink className="button" to="/bookshelf">
          See Books
        </NavLink>
        <p>
          Aenean blandit, erat sed posuere fringilla, nisi mauris euismod est,
          vitae consequat erat nibh in dolor. Curabitur sed faucibus urna. Fusce
          tempor at nibh non lacinia. Donec ipsum ante, efficitur non bibendum
          quis, euismod vitae ante. Ut non lorem nibh. Praesent vel tortor diam.
          Fusce tempor at nibh non lacinia. Donec ipsum ante, efficitur non
          bibendum quis, euismod vitae ante.
        </p>
        <NavLink className="button" to="/add">
          Add Book
        </NavLink>
      </section>
    </>
  );
};

export default Home;