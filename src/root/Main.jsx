import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'Components/not-found/NotFound';
import Map from 'Components/map';
import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';

import Home from '../features/home';
import FeedPages from '../features/feed';
import Bukka from '../features/bukka';

const Register = lazy(() => import('../features/authentication/RegisterPage'));
const Login = lazy(() => import('../features/authentication/LoginPage'));
const Checkout = lazy(() => import('../features/checkout/index'));
const Profile = lazy(() => import('../features/profile'));
const TransactionHistory = lazy(() => import('../features/history'));
const ResetPassword = lazy(() => import('../features/forgotPassword/ResetPassword'));
const PerformResetPass = lazy(() => import('../features/forgotPassword/PerformResetPass'));
const SupportBuyer = lazy(() => import('../features/support/components/SupportBuyer'));
const Articles = lazy(() => import('../features/support/articles'));
const CategoryLists = lazy(() => import('../features/support/Lists'));
const Merchant = lazy(() => import('../features/merchant'));
const ComplainCategory = lazy(() => import('../features/feedback/Category'));
const SubCategory = lazy(() => import('../features/feedback/SubCategory'));
const ComplainScene = lazy(() => import('../features/feedback/ComplainScene'));
const LegalStatement = lazy(() => import('../features/statement'));
const Promotion = lazy(() => import('../features/promotion'));

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bukka/:slug" component={Bukka} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/place-groups/d/:id" component={Promotion} />
      {/* <Route exact path="/categories/:id" component={Category} /> */}
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
      <Route exact path="/legal/:id" component={LegalStatement} />
      <Route exact path="/coming-soon" component={NoNearByBukkaLocation} />
      <Route exact path="/:id" component={FeedPages} />
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
