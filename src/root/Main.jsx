import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'Components/not-found/NotFound';
import Map from 'Components/map';
import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';

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
import Merchant from '../features/merchantPage';
import ComplainCategory from '../features/feedback/Category';
import SubCategory from '../features/feedback/SubCategory';
import ComplainScene from '../features/feedback/ComplainScene';
import Privacy from '../features/statement/Privacy';
import Terms from '../features/statement/Terms';
import Promotion from '../features/promotion';

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
      <Route exact path="/place-groups/d/:id" component={Promotion} />
      <Route exact path="/categories/:id" component={Category} />
      <Route exact path="/merchant/:slug/checkout" component={Checkout} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/history" component={TransactionHistory} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/reset" component={PerformResetPass} />
      <Route exact path="/support/buyer" component={SupportBuyer} />
      <Route exact path="/buyer/articles/:id" component={Articles} />
      <Route exact path="/buyer/lists/:id" component={CategoryLists} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/merchant" component={Merchant} />
      <Route exact path="/buyer/contact-us/help" component={ComplainCategory} />
      <Route exact path="/legal/privacy" component={Privacy} />
      <Route exact path="/legal/terms" component={Terms} />
      <Route exact path="/coming-soon" component={NoNearByBukkaLocation} />
      <Route
        exact
        path="/support/buyer/contact-us/:id"
        component={SubCategory}
      />
      <Route exact path="/buyer/contact-us/:id" component={ComplainScene} />
      <Route
        exact
        path="/store/apple"
        component={() => {
          window.location.href = 'https://www.apple.com/';
          return null;
        }}
      />
      <Route
        exact
        path="/store/android"
        component={() => {
          window.location.href = 'https://play.google.com/store?hl=en';

          return null;
        }}
      />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
