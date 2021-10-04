import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { editBook, addBook, deleteBook, getImage } from '../utils/API';
import { useGetBookDataOnload } from '../utils/hooks';

import '../styles/inputForm.scss';

const InputForm = ({ type }) => {
  const { id } = useParams();
  const history = useHistory();
  const { bookData, setBookData } = useGetBookDataOnload(id);

  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const synopsisInputRef = useRef();
  const publishedInputRef = useRef();
  const pagesInputRef = useRef();

  const handleSubmit = () => {
    const title = titleInputRef.current.value
      ? titleInputRef.current.value
      : bookData.title;

    const author = authorInputRef.current.value
      ? authorInputRef.current.value
      : bookData.author;

    const synopsis = synopsisInputRef.current.value
      ? synopsisInputRef.current.value
      : bookData.synopsis;

    const published = publishedInputRef.current.value
      ? publishedInputRef.current.value
      : bookData.published;

    const pages = pagesInputRef.current.value
      ? pagesInputRef.current.value
      : bookData.pages;

    const { rating } = bookData;

    if (!title || !author || !synopsis || !published || !pages || rating <= 0) {
      // eslint-disable-next-line no-alert
      return alert(`
        Invalid Submition. Please fill in all fields. \n
        Title ${title ? '✅' : '❌'} \n
        Author ${author ? '✅' : '❌'} \n
        Synopsis ${synopsis ? '✅' : '❌'} \n
        Published ${published ? '✅' : '❌'} \n
        Pages ${pages ? '✅' : '❌'} \n
        Rating ${rating ? '✅' : '❌'}
      `);
    }

    if (type === 'edit') {
      editBook(id, { title, author, synopsis, published, pages, rating })
        .then(() => history.push(`/details/${id}`))
        .catch((error) => {
          console.log('An error has occured.', error);
          throw error;
        });
    } else {
      addBook({ title, author, synopsis, published, pages, rating })
        .then(() => history.push(`/bookshelf`))
        .catch((error) => {
          console.log('An error has occured.', error);
          throw error;
        });
    }

    return setBookData((prevState) => {
      return {
        ...prevState,
        title,
        author,
        synopsis,
        published,
        pages,
        rating,
      };
    });
  };

  const handleDelete = () => {
    deleteBook(id)
      .then(() => history.push('/bookshelf'))
      .catch((error) => {
        console.log('An error has occured', error);
        throw error;
      });
  };

  const handleRating = (target) => {
    setBookData((prevState) => ({ ...prevState, rating: target }));
  };

  const { title, author, published, pages, synopsis, image, rating } = bookData;

  const ratingDisplay = [1, 2, 3, 4, 5].map((r) => {
    return (
      <span
        key={`rating-${r}`}
        className={`fa fa-star ${rating >= r ? 'fa-star--checked' : ''}`}
        onClick={() => handleRating(r)}
      />
    );
  });

  return (
    <div className="inputForm">
      <form className="inputForm__container">
        <div>
          <label htmlFor="title" className="edit__container__input">
            <h3>Title</h3>
            <input
              id="title"
              name="title"
              ref={titleInputRef}
              type="text"
              placeholder="Title..."
              defaultValue={title}
            />
          </label>

          <label htmlFor="author" className="edit__container__input">
            <h3>Author</h3>
            <input
              id="author"
              name="author"
              ref={authorInputRef}
              type="text"
              placeholder="Author..."
              defaultValue={author}
            />
          </label>

          <label
            htmlFor="change_image"
            className="edit__container__addimage edit__container__addimage--mobile"
          >
            <img
              src={getImage(title)}
              alt={image}
              style={{ width: 170, height: 235 }}
            />
            <button className="button" type="button">Change Image</button>
          </label>

          <label
            htmlFor="synposis"
            className="edit__container__input edit__container__input--synopsis"
          >
            <h3>Synopsis</h3>
            <textarea
              id="synopsis"
              name="synopsis"
              ref={synopsisInputRef}
              resize="false"
              placeholder="Synopsis..."
              defaultValue={synopsis}
            />
          </label>

          <div className="edit__wrapper">
            <label htmlFor="published" className="edit__container__input">
              <h3>Published</h3>
              <input
                id="published"
                name="published"
                ref={publishedInputRef}
                type="date"
                placeholder="Published..."
                defaultValue={published}
              />
            </label>

            <label htmlFor="pages" className="edit__container__input">
              <h3>Pages</h3>
              <input
                id="pages"
                name="pages"
                ref={pagesInputRef}
                type="number"
                placeholder="1"
                defaultValue={pages}
              />
            </label>
          </div>

          <div className="edit__container__input">
            <h3>Rating</h3>
            <div>{ratingDisplay}</div>
          </div>
        </div>

        <div className="inputForm__container__addimage">
          <img
            src={getImage(title)}
            alt={image}
            style={{ width: 170, height: 235 }}
          />
          <button className="button" type="button">
            Change Image
          </button>
        </div>
      </form>

      <form className="inputForm__edit">
        {type === 'edit' ? (
          <>
            <button
              className="button"
              type="button"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className="button button--alt"
              type="button"
              onClick={() => history.push(`/details/${id}`)}
            >
              Cancel
            </button>
            <button
              className="button button--delete"
              type="button"
              value="Add Image"
              onClick={() => handleDelete()}
            >
              Delete Book
            </button>
          </>
        ) : (
          <>
            <button
              className="button"
              type="button"
              onClick={() => handleSubmit()}
            >
              Add Book
            </button>
            <button
              className="button button--alt"
              type="button"
              onClick={() => history.push(`/`)}
            >
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
};

InputForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InputForm;
