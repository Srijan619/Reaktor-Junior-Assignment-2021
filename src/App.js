import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TableOfContent from './component/TableOfContent';
import Chapters from './component/Chapters';

function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
              <Route path="/" exact component={TableOfContent} />
              <Route exact path='/:name' component={Chapters}></Route>
            </Switch>

          </Router>
    </div>
  );
}

export default App;
