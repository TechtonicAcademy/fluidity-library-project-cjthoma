import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookShelf from './pages/BookShelf';
import AddBook from './pages/AddBook';
import Details from './pages/Details';
import NotFound from './pages/NotFound';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={BookShelf} />
        <Route path="/bookshelf" component={BookShelf} />
        <Route path={['/details', '/details/:id']} component={Details} />
        <Route path="/add" component={AddBook} />
        <Route path="/notfound" component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
