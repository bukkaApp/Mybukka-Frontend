import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../features/home';
import Bukka from '../features/bukka';
import Register from '../features/authentication/RegisterPage';
import Login from '../features/authentication/LoginPage';
import FeedPage from '../features/feed';
import Checkout from '../features/checkout/index';
import Profile from '../features/profile';
<<<<<<< HEAD
import TransactionHistory from '../features/history';
=======
import ResetPassword from '../features/forgotPassword/ResetPassword';
import PerformResetPass from '../features/forgotPassword/PerformResetPass';
>>>>>>> 260ec0ddc769d55cd09b6ad67ca7eef72e03eb91

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bukka" component={Bukka} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/feed" component={FeedPage} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/profile" component={Profile} />
<<<<<<< HEAD
      <Route exact path="/history" component={TransactionHistory} />
=======
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/reset" component={PerformResetPass} />
>>>>>>> 260ec0ddc769d55cd09b6ad67ca7eef72e03eb91
    </Switch>
  </main>
);

export default Main;
