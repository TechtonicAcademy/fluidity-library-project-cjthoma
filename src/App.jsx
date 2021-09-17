import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookShelf from './pages/BookShelf';

const App = () => {
  return (
    <Router>
      <h1 style={{ color: 'black' }}>App</h1>
      <Switch>
        <Route exact path="/" component={BookShelf} />
        <Route path="/bookshelf" component={BookShelf} />
        <Route path="/add" component={BookShelf} />
        <Route path="/notfound" component={BookShelf} />
      </Switch>
    </Router>
  );
};

export default App;
