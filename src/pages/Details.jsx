import { useHistory, useParams } from 'react-router-dom';
import { useScrollToTop, useGetBookDataOnload } from '../utils/hooks';
import { deleteBook, getImage } from '../utils/API';
import '../styles/details.scss';

const Details = () => {
  useScrollToTop();
  const { id } = useParams();
  const history = useHistory();

  const { bookData } = useGetBookDataOnload(id);

  const handleDelete = () => {
    deleteBook(id)
      .then(() => history.push('/bookshelf'))
      .catch((error) => {
        console.log('An error has occured', error);
        throw error;
      });
  };

  const { title, author, published, pages, synopsis, image, rating } = bookData;

  const ratingDisplay = [1, 2, 3, 4, 5].map((r) => {
    return (
      <span
        key={`rating_${r}`}
        className={`fa fa-star ${rating >= r ? 'fa-star--checked' : ''}`}
      />
    );
  });

  return (
    <section className="details">
      <div className="details__container">
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
      </div>
      <div className="details__edit">
        <button
          className="button"
          onClick={() => history.push(`/edit/${id}`)}
          type="button"
        >
          Edit Book
        </button>
        <button
          className="button button--alt"
          onClick={() => history.push(`/bookshelf`)}
          type="button"
        >
          Back to Shelf
        </button>

        <button
          className="button button--delete"
          onClick={() => handleDelete()}
          type="button"
        >
          Delete Book
        </button>
      </div>
    </section>
  );
};

export default Details;
