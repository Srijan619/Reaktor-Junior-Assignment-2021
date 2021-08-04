import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TableOfContent from './component/TableOfContent';
import Chapters from './component/Chapters';
import Rules from './component/Rules';

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
              <Route path="/" exact component={TableOfContent} />
              <Route exact path='/:name' component={Chapters}></Route>
              <Route exact path='/rules/:name' component={Rules}></Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
