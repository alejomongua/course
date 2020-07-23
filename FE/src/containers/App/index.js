/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LoginPage from "../LoginPage";
import NavigationContainer from "containers/NavigationContainer";
import { getAuth } from 'containers/AuthContainer/meta/selectors'

function App({ auth }) {
  return (<>
      {auth.isAuthenticated ? <NavigationContainer /> : <LoginPage />}
    </>);
}

App.propTypes = {};

const mapStateToProps = (auth) => ({
  auth: getAuth(auth)
})

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(App);
