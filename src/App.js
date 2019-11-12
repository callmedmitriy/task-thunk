import React, {Fragment} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import ServiceEdit from './components/ServiceEdit';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route path="/">
            <Redirect to="services"/>
          </Route>
          <Route path="/services" exact component={ServiceList}/>
          <Route path="/services/:id" component={ServiceEdit}/>
          <Route component={ServiceList}/>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
