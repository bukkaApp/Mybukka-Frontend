import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'Components/not-found/NotFound';
import Home from '../features/home';
import Bukka from '../features/bukka';
import Register from '../features/authentication/RegisterPage';
import Login from '../features/authentication/LoginPage';
import FeedPage from '../features/feed';
import Checkout from '../features/checkout/index';
import Profile from '../features/profile';
import TransactionHistory from '../features/history';
import ResetPassword from '../features/forgotPassword/ResetPassword';
import PerformResetPass from '../features/forgotPassword/PerformResetPass';
import SupportBuyer from '../features/support/components/SupportBuyer';
import Articles from '../features/support/articles';
import CategoryLists from '../features/support/Lists';
import Merchant from '../features/merchant';

const Drinks = ({ ...props }) => <FeedPage {...props} drink />;
const Foods = ({ ...props }) => <FeedPage {...props} food />;
const Fresh = ({ ...props }) => <FeedPage {...props} fresh />;
const Search = ({ ...props }) => <FeedPage {...props} search />;
const Category = ({ ...props }) => <FeedPage {...props} category />;
const Favorites = ({ ...props }) => <FeedPage {...props} favorites />;

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bukka/:slug" component={Bukka} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/feed" food component={Foods} />
      <Route exact path="/drinks" component={Drinks} />
      <Route exact path="/fresh" component={Fresh} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/categories/:id" component={Category} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/history" component={TransactionHistory} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/reset" component={PerformResetPass} />
      <Route exact path="/support/buyer" component={SupportBuyer} />
      <Route exact path="/buyer/articles/:id" component={Articles} />
      <Route exact path="/buyer/lists/:id" component={CategoryLists} />
      <Route exact path="/merchant" component={Merchant} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
