import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../features/home';
import Bukka from '../features/bukka';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bukka" component={Bukka} />
    </Switch>
  </main>
);

export default Main;
