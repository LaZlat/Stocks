import React from 'react';
import './App.css';
import Home from './pages/index';
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignInPage from './pages/singin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path ="/" component={Home} exact />
        <Route path ="/signin" component={SignInPage} exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
