import { Layout } from 'antd';
import React, {useState} from 'react'
import { Switch, Route } from 'react-router';
import Navbar from '../components/Navbar-Main';
import { Homepage } from '../components/Main';
import { Exchanges } from '../components/Exchanges';
{/*import Stocks from '../components/Stocks';
import StockDetails from '../components/StockDetails';
import News from '../components/News';*/}


const Main = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const NavRoute = ({exact, path, component: Component}) => (
        <Route exact={exact} path={path} render={(props) => (
          <div>
            <Navbar toggle={toggle} />
            <Component {...props}/>
          </div>
        )}/>
      )

    return (
        <>
        <Layout>
            <Switch>
                <NavRoute exact path="/main" component={Homepage}/>
                <NavRoute exact path="/exchanges" component={Exchanges}/>
                {/*<Route exact path="/stocks">
                    <Stocks />
                </Route>
                <Route exact path="/stock/:stockId">
                    <StockDetails />
                </Route>
                <Route exact path="/news">
                    <News />
                </Route>*/}
            </Switch>
        </Layout>
        </>
    );
};

export default Main
