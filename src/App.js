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
import StockDetailsPage from './pages/stock';
import {ProtectedRoute} from "./ProtectedRoute";
import PortfolioPage from './pages/portfolio';
import AutoPage from './pages/auto';


function App() {
  return (
    <Router>
    <Provider store={store}>
      <Switch>
        <Route path ="/" component={Home} exact />
        <Route path ="/signin" component={SignInPage} exact />
        <Route path ="/signup" component={SignUpPage} exact />
        <ProtectedRoute exact path ="/main" component={MainPage} />
        <ProtectedRoute exact path ="/cryptos" component={CryptosPage} />
        <ProtectedRoute exact path ="/crypto/:id" component={CryptoDetailsPage} />
        <ProtectedRoute exact path ="/stocks" component={StocksPage} />
        <ProtectedRoute exact path ="/stock/:symbol" component={StockDetailsPage} />
        <ProtectedRoute exact path ="/portfolio" component={PortfolioPage} />
        <ProtectedRoute exact path ="/auto" component={AutoPage} />
      </Switch>
      <Footer />
      </Provider>
    </Router>
  );
}

export default App;
