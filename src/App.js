import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import About from './About';
import Welcome from './Welcome';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false,
    }
  }
  


  render() {
    console.log(this.props.auth0.isAuthenticated)
    return (
      <>
        <Router>
        {this.props.auth0.isAuthenticated 
         ?
         <Profile /> 
         : <Welcome />}
              {/* allowed b/c the export method was with functions */ },
          <Header />
          <Routes>

            {this.props.auth0.isAuthenticated
            ?
              <Route
              exact path="/"
              element={<BestBooks />}>
            </Route>
            :
            <Route
            exact path="/"
            element={<Welcome />}>
          </Route>
          }

            <Route
              path="/about"
              element={<About />}>
              </Route>

            <Route
              path="/profile"
              element={<Profile />}>
              </Route>
            </Routes>
            
            <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
