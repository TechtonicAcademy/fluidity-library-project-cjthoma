import { NavLink } from 'react-router-dom';
import '../styles/details.scss';

const Details = () => {
  return (
    <section className="details">
      <div className="details__container">
        <div className="details__bookcover">
          {/* <img src="./assets/images/enders_game_cover.jpg" alt="book_cover" /> */}
          <img />
          <div>
            <span className="fa fa-star fa-star--checked" />
            <span className="fa fa-star fa-star--checked" />
            <span className="fa fa-star fa-star--checked" />
            <span className="fa fa-star" />
            <span className="fa fa-star" />
          </div>
        </div>

        <div className="details__info">
          <h2 className="details__info__title">Ender's Game</h2>
          <h3>Orson Scott</h3>
          <p>
            <em>Published: January 1985</em>
          </p>
          <p>
            <em>324 pages</em>
          </p>
          <p>
            In the future, humanity has mastered interplanetary spaceflight and
            as they explore the galaxy, they encounter an insect-like alien race
            called the Formics. After discovering a Formic base on asteroid
            Eros, war breaks out between the humans and Formics. The humans
            achieve a narrow victory, but fearing future threats of a Formic
            invasion, create the International Fleet (I.F.) and train gifted
            children to become commanders at their orbiting Battle School.
          </p>
        </div>
      </div>
      <div className="details__edit">
        <NavLink className="button" to="/edit">
          Edit Book
        </NavLink>
        <NavLink className="button" to="/bookshelf">
          Back to Shelf
        </NavLink>
      </div>
    </section>
  );
};

export default Details;
