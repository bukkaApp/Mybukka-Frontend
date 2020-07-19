import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'Components/not-found/NotFound';
import Map from 'Components/map';
import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';

import { ProgressBar } from '../components/progress-bar/IndeterminateProgressbar';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import PublicRoute from '../components/PublicRoute/PublicRoute';
import Home from '../features/home';
import LegalStatement from '../features/statement';

import FeedPages from '../features/feed';
import Bukka from '../features/bukka';
import Checkout from '../features/checkout';

const Profile = lazy(() => import('../features/profile'));
const Register = lazy(() => import('../features/authentication/RegisterPage'));
const Login = lazy(() => import('../features/authentication/LoginPage'));
const TransactionHistory = lazy(() => import('../features/history/History'));
const Favorites = lazy(() => import('../features/favorites/Favorites'));
const ResetPassword = lazy(() => import('../features/forgotPassword/ResetPassword'));
const PerformResetPass = lazy(() => import('../features/forgotPassword/PerformResetPass'));
const SupportBuyer = lazy(() => import('../features/support/components/SupportBuyer'));
const Articles = lazy(() => import('../features/support/articles'));
const CategoryLists = lazy(() => import('../features/support/Lists'));
const Merchant = lazy(() => import('../features/merchant'));
const ComplainCategory = lazy(() => import('../features/feedback/Category'));
const SubCategory = lazy(() => import('../features/feedback/SubCategory'));
const ComplainScene = lazy(() => import('../features/feedback/ComplainScene'));
const Promotion = lazy(() => import('../features/promotion'));

const Main = () => (
  <main>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <Suspense fallback={<ProgressBar loading />}>
        <PublicRoute exact path="/bukka/:slug" component={Bukka} />
        <PublicRoute exact path="/signup" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/place-groups/d/:id" component={Promotion} />

        {/* <Route exact path="/categories/:id" component={Category} /> */}
        <PrivateRoute exact path="/merchant/:slug/checkout" component={Checkout} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/favorites" component={Favorites} />
        <PrivateRoute exact path="/history" component={TransactionHistory} />

        <PublicRoute exact path="/reset-password" component={ResetPassword} />
        <PublicRoute exact path="/reset" component={PerformResetPass} />
        <PublicRoute exact path="/support/buyer" component={SupportBuyer} />
        <PublicRoute exact path="/buyer/articles/:id" component={Articles} />
        <PublicRoute exact path="/buyer/lists/:id" component={CategoryLists} />
        <PublicRoute exact path="/map" component={Map} />
        <PublicRoute exact path="/merchant" component={Merchant} />
        <PublicRoute exact path="/buyer/contact-us/help" component={ComplainCategory} />

        <PrivateRoute exact path="/buyer/contact-us/:id" component={ComplainScene} />
        <PublicRoute exact path="/support/buyer/contact-us/:id" component={SubCategory} />
        <PublicRoute exact path="/legal/:id" component={LegalStatement} />
        <PublicRoute exact path="/coming-soon" component={NoNearByBukkaLocation} />
        <PublicRoute exact path="/:id" component={FeedPages} />
      </Suspense>

      <PublicRoute
        exact
        path="/store/apple"
        component={() => {
          window.location.href = 'https://www.apple.com/';
          return null;
        }}
      />
      <PublicRoute
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
