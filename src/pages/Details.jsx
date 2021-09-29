import { NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getBook, getImage } from '../utils/API';
import '../styles/details.scss';

const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
    getBook(id)
      .then((bookData) => {
        const { title, author, published, rating, synopsis, image } =
          bookData.data;
        return setBookData((prevState) => ({
          ...prevState,
          title,
          author,
          published,
          rating,
          synopsis,
          image,
        }));
      })
      .catch((error) => {
        console.log('An error has occured.', error);
        return history.push('/bookshelf');
      });
  }, []);

  const { title, author, published, pages, synopsis, image, rating } = bookData;
  const ratingDisplay = [];

  for (let i = 0; i < 5; i += 1) {
    ratingDisplay.push(
      <span
        key={`rating_${i + 1}`}
        className={`fa fa-star ${rating >= i + 1 ? 'fa-star--checked' : ''}`}
      />
    );
  }

  return (
    <section className="details">
      <div className="details__container">
        {bookData.title ? (
          <>
            <div className="details__bookcover">
              <img src={getImage(title)} alt={image} />
              <div>{ratingDisplay}</div>
            </div>

            <div className="details__info">
              <h2 className="details__info__title">{title}</h2>
              <h3>{author}</h3>
              <p>
                <em>Published: {published}</em>
              </p>
              <p>
                <em>{pages}</em>
              </p>
              <p>{synopsis} </p>
            </div>
          </>
        ) : (
          <div style={{ height: 500 }} />
        )}
      </div>
      <div className="details__edit">
        <button
          className="button"
          onClick={() => history(`/edit/${id}`)}
          type="submit"
        >
          Edit Book
        </button>
        <button
          className="button"
          onClick={() => history(`/bookshelf`)}
          type="submit"
        >
          Back to Shelf
        </button>
      </div>
    </section>
  );
};

export default Details;
