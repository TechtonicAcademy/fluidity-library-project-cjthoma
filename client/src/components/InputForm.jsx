import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { editBook, addBook, deleteBook } from '../utils/API';
import { useGetBookDataOnload } from '../utils/hooks';
import handleAddImage from '../utils/handleAddImage';

import '../styles/inputForm.scss';

const InputForm = ({ type }) => {
  const { id } = useParams();
  const history = useHistory();
  const { bookData, setBookData } = useGetBookDataOnload(id);
  const [inputValid, setInputValid] = useState(false);

  const titleInputRef = useRef();
  const firstInputRef = useRef();
  const lastInputRef = useRef();
  const synopsisInputRef = useRef();
  const publishedInputRef = useRef();
  const pagesInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = titleInputRef.current.value
      ? titleInputRef.current.value
      : bookData.title;

    const first = firstInputRef.current.value
      ? firstInputRef.current.value
      : bookData.first;

    const last = lastInputRef.current.value
      ? lastInputRef.current.value
      : bookData.last;

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

    if (!title || !first || !last || !synopsis || !published || !pages || rating <= 0) {
      // eslint-disable-next-line no-alert
      return alert(`
        Invalid Submition. Please fill in all fields. \n
        Title ${title ? '✅' : '❌'} \n
        Author First Name ${first ? '✅' : '❌'} \n
        Author Last Name ${last ? '✅' : '❌'} \n
        Synopsis ${synopsis ? '✅' : '❌'} \n
        Published ${published ? '✅' : '❌'} \n
        Pages ${pages ? '✅' : '❌'} \n
        Rating ${rating ? '✅' : '❌'}
      `);
    }

    setInputValid(true);
    return setBookData((prevState) => {
      return {
        ...prevState,
        title,
        first,
        last,
        synopsis,
        published,
        pages,
        rating,
      };
    });
  };

  useEffect(() => {
    if (!inputValid) return;
    const formData = new FormData();
    Object.keys(bookData).forEach((key) => {
      if (key === 'tmpImage') return; // ignore temp image... only used to display user selection
      formData.append(key, bookData[key]);
    });

    if (type === 'edit') {
      editBook(id, formData)
        .then(() => history.push(`/details/${id}`))
        .catch((error) => {
          console.log('An error has occured.', error);
          throw error;
        });
    } else {
      addBook(formData)
        .then(() => history.push(`/bookshelf`))
        .catch((error) => {
          console.log('An error has occurred.', error, title, author, synopsis, published, pages, rating);
          throw error;
        });
    }
  }, [inputValid]);

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

  const { title, first, last, published, pages, synopsis, rating, tmpImage } =
    bookData;

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
          <label htmlFor="title" className="inputForm__container__input">
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

          <div className="inputForm__wrapper">
            <label htmlFor="author" className="inputForm__container__input">
              <h3>Author First</h3>
              <input
                id="first_name"
                name="first_name"
                ref={firstInputRef}
                type="text"
                placeholder="First Name..."
                defaultValue={first}
              />
               <h3>Author Last</h3>
              <input
                id="last_name"
                name="last_name"
                ref={lastInputRef}
                type="text"
                placeholder="Last Name..."
                defaultValue={last}
              />
            </label>
          </div>

          <label
            htmlFor="change_image"
            className="edit__container__addimage edit__container__addimage--mobile"
          >
            <img
              crossOrigin="true"
              src={tmpImage}
              alt={`${title ? title : 'default'}_book_cover`}
              style={{ width: 170, height: 235 }}
            />
            <input
              id="addimage"
              name="addimage"
              type="file"
              onChange={(event) =>
                handleAddImage(event.target.files[0], setBookData)
              }
            />
          </label>

          <label
            htmlFor="synposis"
            className="inputForm__container__input inputForm__container__input--synopsis"
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

          <div className="inputForm__wrapper">
            <label htmlFor="published" className="inputForm__container__input">
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

            <label htmlFor="pages" className="inputForm__container__input">
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

          <div className="inputForm__container__input">
            <h3>Rating</h3>
            <div>{ratingDisplay}</div>
          </div>
        </div>

        <label htmlFor="addimage" className="inputForm__container__addimage">
          <img
            crossOrigin="true"
            src={tmpImage}
            alt={`${title ? title : 'default'}_book_cover`}
            style={{ width: 170, height: 235 }}
          />
          <input
            id="addimage"
            name="addimage"
            type="file"
            onChange={(event) =>
              handleAddImage(event.target.files[0], setBookData)
            }
          />
        </label>
      </form>

      <form className="inputForm__edit">
        {type === 'edit' ? (
          <>
            <button
              className="button"
              type="submit"
              onClick={(event) => handleSubmit(event)}
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
              onClick={() => handleDelete()}
            >
              Delete Book
            </button>
          </>
        ) : (
          <>
            <button
              className="button"
              type="submit"
              onClick={(event) => handleSubmit(event)}
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
