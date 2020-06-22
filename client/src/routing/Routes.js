import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from '../components/profileForms/CreateProfile';
import EditProfile from '../components/profileForms/EditProfile';
import AddExperience from '../components/profileForms/AddExperience';
import AddEducation from '../components/profileForms/AddEducation';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import Posts from '../components/posts/Posts';
import Post from '../components/post/Post';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import NotFound from '../components/layouts/NotFound';
import Alert from '../components/layouts/Alert';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
