import React, {Fragment} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import ServiceEdit from './components/ServiceEdit';
import ServiceList from './components/ServiceList';
import page404 from './components/page404';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="services"/>
          </Route>
          <Route path="/services" exact component={ServiceList}/>
          <Route path="/services/:id" component={ServiceEdit}/>
          <Route component={page404}/>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
