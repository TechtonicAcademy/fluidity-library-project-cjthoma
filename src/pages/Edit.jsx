import { useEffect } from 'react';

import '../styles/edit.scss';

const Edit = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
  }, []);

  return (
    <section className="edit">
      <h1 className="edit__title">Edit Book</h1>
      <div className="edit__container">
        <div>
          <div className="edit__container__input">
            <h3>Title</h3>
            <input type="text" placeholder="Ender's Game" />
          </div>

          <div className="edit__container__input">
            <h3>Author</h3>
            <input type="text" placeholder="Orson Scott" />
          </div>

          <div className="edit__container__addimage edit__container__addimage--mobile">
            <img
              className="edit__container__addimage__image"
              src="./assets/images/enders_game_cover.jpg"
              alt="book_cover"
            />
            <button type="submit" value="Add Image">
              Change Image
            </button>
          </div>

          <div className="edit__container__input edit__container__input--synopsis">
            <h3>Synopsis</h3>
            <textarea
              resize="false"
              placeholder="In the future, humanity has mastered interplanetary spaceflight and as they explore the galaxy, they encounter an insect-like alien race called the Formics. After discovering a Formic base on asteroid Eros, war breaks out between the humans and Formics. The humans achieve a narrow victory, but fearing future threats of a Formic invasion, create the International Fleet (I.F.) and train gifted children to become commanders at their orbiting Battle School. "
            />
          </div>

          <div className="edit__wrapper">
            <div className="edit__container__input">
              <h3>Published</h3>
              <input type="date" placeholder="Choose a Date" />
            </div>

            <div className="edit__container__input">
              <h3>Pages</h3>
              <input type="number" placeholder="324" />
            </div>
          </div>

          <div className="edit__container__input">
            <h3>Rating</h3>
            <div>
              <span className="fa fa-star fa-star--checked" />
              <span className="fa fa-star fa-star--checked" />
              <span className="fa fa-star fa-star--checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
        </div>

        <div className="edit__container__addimage">
          <img className="edit__container__addimage__image" />
          <button type="submit" value="Add Image">
            Change Image
          </button>
        </div>
      </div>
      <div className="edit__edit">
        <button type="submit" value="Add Image">
          Submit
        </button>
        <button className="button--alt" type="submit" value="Add Image">
          Cancel
        </button>
        <button className="button--delete" type="submit" value="Add Image">
          Delete Book
        </button>
      </div>
    </section>
  );
};

export default Edit;
