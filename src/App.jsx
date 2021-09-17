import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookShelf from './pages/BookShelf';
import AddBook from './pages/AddBook';
import Details from './pages/Details';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <h1>App</h1>
      <Switch>
        <Route exact path="/" component={BookShelf} />
        <Route path={['/details', '/details/:id']} component={Details} />
        <Route path="/add" component={AddBook} />
        <Route path="/notfound" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
