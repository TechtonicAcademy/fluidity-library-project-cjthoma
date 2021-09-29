import { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { editBook, deleteBook, getBook, getImage } from '../utils/API';

import '../styles/edit.scss';
import { parseInt } from 'lodash';

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [bookData, setBookData] = useState({});

  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const synopsisInputRef = useRef();
  const publishedInputRef = useRef();
  const pagesInputRef = useRef();

  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
    getBook(id)
      .then((bookData) => {
        const { title, author, published, rating, synopsis, pages, image } =
          bookData.data;
        return setBookData((prevState) => ({
          ...prevState,
          title,
          author,
          pages: parseInt(pages),
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

    editBook(id, { title, author, synopsis, published, pages, rating })
      .then(() => history.push(`/details/${id}`))
      .catch((error) => {
        console.log('An error has occured.', error);
        throw error;
      });

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

  const ratingDisplay = [];
  for (let i = 0; i < 5; i += 1) {
    ratingDisplay.push(
      // eslint-disable-next-line prettier/prettier
      <span className={`fa fa-star ${rating >= i + 1 ? 'fa-star--checked' : ''}`} onClick={() => handleRating(i + 1)} />
    );
  }

  return (
    <section className="edit">
      <h1 className="edit__title">Edit Book</h1>
      <div className="edit__container">
        <div>
          <div className="edit__container__input">
            <h3>Title</h3>
            <input ref={titleInputRef} type="text" placeholder={title} />
          </div>

          <div className="edit__container__input">
            <h3>Author</h3>
            <input ref={authorInputRef} type="text" placeholder={author} />
          </div>

          <div className="edit__container__addimage edit__container__addimage--mobile">
            <img
              src={getImage(title)}
              alt={image}
              style={{ width: 170, height: 235 }}
            />
            <button className="button" type="submit" value="Add Image">
              Change Image
            </button>
          </div>

          <div className="edit__container__input edit__container__input--synopsis">
            <h3>Synopsis</h3>
            <textarea
              ref={synopsisInputRef}
              resize="false"
              placeholder={synopsis}
            />
          </div>

          <div className="edit__wrapper">
            <div className="edit__container__input">
              <h3>Published</h3>
              <input
                ref={publishedInputRef}
                type="date"
                placeholder={published}
              />
            </div>

            <div className="edit__container__input">
              <h3>Pages</h3>
              <input ref={pagesInputRef} type="number" placeholder={pages} />
            </div>
          </div>

          <div className="edit__container__input">
            <h3>Rating</h3>
            <div>{ratingDisplay}</div>
          </div>
        </div>

        <div className="edit__container__addimage">
          <img
            src={getImage(title)}
            alt={image}
            style={{ width: 170, height: 235 }}
          />
          <button className="button" type="submit" value="Add Image">
            Change Image
          </button>
        </div>
      </div>
      <div className="edit__edit">
        <button
          className="button"
          type="submit"
          value="Add Image"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
        <button
          className="button--alt"
          type="submit"
          value="Add Image"
          onClick={() => history.push(`/details/${id}`)}
        >
          Cancel
        </button>
        <button
          className="button--delete"
          type="submit"
          value="Add Image"
          onClick={() => handleDelete()}
        >
          Delete Book
        </button>
      </div>
    </section>
  );
};

export default Edit;
