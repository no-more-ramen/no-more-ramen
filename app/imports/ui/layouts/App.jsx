import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddRecipe from '../pages/AddRecipe';
import AddIngredients from '../pages/AddIngredients';
import EditRecipe from '../pages/EditRecipe';
import EditIngredient from '../pages/EditIngredient';
import EditStudentProfile from '../pages/EditStudentProfile';
import EditVendorProfile from '../pages/EditVendorProfile';
import FullRecipe from '../pages/FullRecipe';
import StudentProfile from '../pages/StudentProfile';
import VendorHome from '../pages/VendorHome';
import VendorProfile from '../pages/VendorProfile';
import PublicVendorProfile from '../pages/PublicVendorProfile';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import StudentHome from '../pages/StudentHome';
import RecipeSearch from '../pages/RecipeSearch';
import IngredientSearch from '../pages/IngredientSearch';
import NewestIngredients from '../pages/NewestIngredients';
import NewestRecipes from '../pages/NewestRecipes';
import Favorites from '../pages/Favorites';
import AdminHomePage from '../pages/AdminHomePage';
import UserList from '../pages/UserList';
import EditUserList from '../pages/EditUserList';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/search" element={<RecipeSearch />} />
        <Route path="/search-ingredients" element={<IngredientSearch />} />
        <Route path="/recipe/:_id" element={<FullRecipe />} />
        <Route path="/student" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminHomePage /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
        <Route path="/add-ingredients" element={<ProtectedRoute><AddIngredients /></ProtectedRoute>} />
        <Route path="/vendor" element={<ProtectedRoute><VendorHome /></ProtectedRoute>} />
        <Route path="/vendorprofile" element={<ProtectedRoute><VendorProfile /></ProtectedRoute>} />
        <Route path="/publicVendorProfile/:name" element={<ProtectedRoute><PublicVendorProfile /></ProtectedRoute>} />
        <Route path="/edit-recipe/:_id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
        <Route path="/edit-ingredient/:_id" element={<ProtectedRoute><EditIngredient /></ProtectedRoute>} />
        <Route path="/edit-student-profile/:_id" element={<ProtectedRoute><EditStudentProfile /></ProtectedRoute>} />
        <Route path="/edit-vendor-profile/:_id" element={<ProtectedRoute><EditVendorProfile /></ProtectedRoute>} />
        <Route path="/newest-recipes" element={<AdminProtectedRoute><NewestRecipes /></AdminProtectedRoute>} />
        <Route path="/newest-ingredients" element={<AdminProtectedRoute><NewestIngredients /></AdminProtectedRoute>} />
        <Route path="/user-list" element={<AdminProtectedRoute><UserList /></AdminProtectedRoute>} />
        <Route path="/edit-user-list/:_id" element={<AdminProtectedRoute><EditUserList /></AdminProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
