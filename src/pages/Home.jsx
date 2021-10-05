import { NavLink } from 'react-router-dom';
import { useScrollToTop } from '../utils/hooks';
import '../styles/home.scss';
import heroImage from '../assets/images/pexels-janko-ferlic-590493.jpg';

const Home = () => {
  useScrollToTop();

  return (
    <>
      <section className="hero">
        <h1 className="hero__title">
          Books: <span>The only time it's okay to leave them on read.</span>
        </h1>
        <img src={heroImage} alt="library_bookshelf_hero_image" />
      </section>

      <section className="home">
        <h3 className="home__title">Welcome to the Library</h3>
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
