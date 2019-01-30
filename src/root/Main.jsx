import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchLocation from '../features/home';

const sampleComponent = () => (
  <SearchLocation />
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={sampleComponent} />
    </Switch>
  </main>
);

export default Main;
