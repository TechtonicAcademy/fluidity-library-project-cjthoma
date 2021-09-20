import '../styles/addbook.scss';

const AddBook = () => {
  return (
    <section className="main">
      <h1 className="main__title">Add Book</h1>
      <div className="main__container">
        <div>
          <div className="main__container__input">
            <h3>Title</h3>
            <input type="text" placeholder="Title..." />
          </div>

          <div className="main__container__input">
            <h3>Author</h3>
            <input type="text" placeholder="Author..." />
          </div>

          <div className="main__container__addimage--mobile">
            <div>Add Image</div>
            <button type="submit" value="Add Image">
              Add Image
            </button>
          </div>

          <div className="main__container__input main__container__input--synopsis">
            <h3>Synopsis</h3>
            <textarea resize="false" />
          </div>

          <div className="main__wrapper">
            <div className="main__container__input">
              <h3>Published</h3>
              <input type="date" />
            </div>

            <div className="main__container__input">
              <h3>Pages</h3>
              <input type="number" />
            </div>
          </div>

          <div className="main__container__input">
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

        <div className="main__container__addimage">
          <div>Add Image</div>
          <button type="submit" value="Add Image">
            Add Image
          </button>
        </div>
      </div>
      <div className="main__edit">
        <button type="submit" value="Add Book">
          Add Book
        </button>
        <button className="button--alt" type="submit" value="Cancel">
          Cancel
        </button>
      </div>
    </section>
  );
};
export default AddBook;
