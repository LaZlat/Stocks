import React from 'react';
import './App.css';
import Home from './pages/index';
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignInPage from './pages/singin';
import SignUpPage from './pages/singup';
import MainPage from './pages/main';
import CryptosPage from './pages/cryptos';
import CryptoDetailsPage from './pages/crypto';
import {Provider} from 'react-redux';
import store from './app/store';
import StocksPage from './pages/stocks';


function App() {
  return (
    <Router>
    <Provider store={store}>
      <Switch>
        <Route path ="/" component={Home} exact />
        <Route path ="/signin" component={SignInPage} exact />
        <Route path ="/signup" component={SignUpPage} exact />
        <Route path ="/main" component={MainPage} exact />
        <Route path ="/cryptos" component={CryptosPage} exact />
        <Route path ="/crypto/:id" component={CryptoDetailsPage} exact />
        <Route path ="/stocks" component={StocksPage} exact />
      </Switch>
      <Footer />
      </Provider>
    </Router>
  );
}

export default App;
