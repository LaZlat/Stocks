import React, {useState} from 'react'
import { Stocks } from '../components/Stocks'
import Navbar from '../components/Navbar-Main';
import Sidebar from '../components/Sidebar-Main';

const StocksPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Stocks />
        </>
    )
}

export default StocksPage
