import React, {useState} from 'react'
import { Stocks } from '../components/Stocks'
import Navbar from '../components/Navbar-Main';

const StocksPage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
        <Navbar toggle={toggle} />
        <Stocks />
        </>
    )
}

export default StocksPage
