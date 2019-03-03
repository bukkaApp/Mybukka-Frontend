import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../features/home';
import Bukka from '../features/bukka';
import Register from '../features/authentication/RegisterPage';
import Login from '../features/authentication/LoginPage';
import FeedPage from '../features/feed';
import Checkout from '../features/checkout/index';
<<<<<<< HEAD
import Profile from '../features/profile';
=======
>>>>>>> refactor(redux): refactor authentication pages

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bukka" component={Bukka} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/feed" component={FeedPage} />
      <Route exact path="/checkout" component={Checkout} />
<<<<<<< HEAD
      <Route exact path="/profile" component={Profile} />
=======
>>>>>>> refactor(redux): refactor authentication pages
    </Switch>
  </main>
);

export default Main;
