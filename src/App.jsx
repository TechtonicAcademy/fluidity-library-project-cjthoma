import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookShelf from './pages/BookShelf';
import Details from './pages/Details';
import AddBook from './pages/AddBook';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/bookshelf" component={BookShelf} />
          <Route path="/details/:id" component={Details} />
          <Route path="/add" component={AddBook} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
