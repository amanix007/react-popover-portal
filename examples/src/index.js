import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import ReactDOM from 'react-dom';
import React from 'react';

// - Root component
import App from './components/App';
import Basic from './routes/Basic';
import Arrow from './routes/Arrow';
import Animated from './routes/Animated';
import Group from './routes/Group';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Basic}></IndexRoute>   
      <Route path='arrow' component={Arrow}></Route> 
      <Route path='animated' component={Animated}></Route> 
      <Route path='group' component={Group}></Route> 
    </Route>
  </Router>,
  document.getElementById('root')
);
