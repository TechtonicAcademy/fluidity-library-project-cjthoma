import { useState, useRef, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { addBook } from '../utils/API';

import '../styles/addbook.scss';

const AddBook = () => {
  const history = useHistory();
  const [bookData, setBookData] = useState({ rating: 0 });

  const titleInputRef = useRef();
  const authorInputRef = useRef();
  const synopsisInputRef = useRef();
  const publishedInputRef = useRef();
  const pagesInputRef = useRef();

  const handleSubmit = () => {
    const title = titleInputRef.current.value;
    const author = authorInputRef.current.value;
    const synopsis = synopsisInputRef.current.value;
    const published = publishedInputRef.current.value;
    const pages = pagesInputRef.current.value;
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

    addBook({ title, author, synopsis, published, pages, rating })
      .then(() => history.push('/'))
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

  const handleRating = (target) => {
    setBookData((prevState) => ({ ...prevState, rating: target }));
  };

  const ratingDisplay = [];
  for (let i = 0; i < 5; i += 1) {
    ratingDisplay.push(
      <span
        className={`fa fa-star ${
          bookData.rating >= i + 1 ? 'fa-star--checked' : ''
        }`}
        onClick={() => handleRating(i + 1)}
      />
    );
  }

  return (
    <section className="addbook">
      <h1 className="addbook__title">Add Book</h1>
      <div className="addbook__container">
        <div>
          <div className="addbook__container__input">
            <h3>Title</h3>
            <input ref={titleInputRef} type="text" placeholder="Title..." />
          </div>

          <div className="addbook__container__input">
            <h3>Author</h3>
            <input ref={authorInputRef} type="text" placeholder="Author..." />
          </div>

          <div className="addbook__container__addimage--mobile">
            <div>Add Image</div>
            <button type="submit" value="Add Image">
              Add Image
            </button>
          </div>

          <div className="addbook__container__input addbook__container__input--synopsis">
            <h3>Synopsis</h3>
            <textarea ref={synopsisInputRef} resize="false" />
          </div>

          <div className="addbook__wrapper">
            <div className="addbook__container__input">
              <h3>Published</h3>
              <input ref={publishedInputRef} type="date" />
            </div>

            <div className="addbook__container__input">
              <h3>Pages</h3>
              <input ref={pagesInputRef} type="number" />
            </div>
          </div>

          <div className="addbook__container__input">
            <h3>Rating</h3>
            <div>
              {ratingDisplay}
            </div>
          </div>
        </div>

        <div className="addbook__container__addimage">
          <div>Add Image</div>
          <button type="submit" value="Add Image">
            Add Image
          </button>
        </div>
      </div>
      <div className="addbook__edit">
        <button className="button" type="submit" value="Add Book" onClick={() => handleSubmit()}>
          Add Book
        </button>
        <NavLink className="button" to="/">
          Cancel
        </NavLink>
      </div>
    </section>
  );
};
export default AddBook;
