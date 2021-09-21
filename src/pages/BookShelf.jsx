import '../styles/bookshelf.scss';

const BookShelf = () => {
  const testBook = {
    author: 'Orson Scott Card',
    title: "Ender's Game",
    image: 'assets/images/enders_game_cover.jpg',
    alt: 'enders_game_cover',
  };

  const books = [];

  for (let i = 0; i < 9; i += 1) {
    books.push(
      <div key={`${i}_${testBook.title}`} className="bookshelf__container__card">
        <img src={testBook.image} alt={testBook.alt} />
        <h3>{testBook.title}</h3>
        <p>{testBook.author}</p>
      </div>
    );
  }

  return (
    <section className="bookshelf">
      <div className="navbar__searchbar--mobile">
        <input type="text" placeholder="Search.." />
        <button type="submit" value="Go">
          Go
        </button>
      </div>
      <h3 className="bookshelf__title">Knowledge is Power!</h3>
      <section className="bookshelf__container">{books}</section>
    </section>
  );
};

export default BookShelf;
